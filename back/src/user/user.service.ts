import { Injectable } from '@nestjs/common';
import { createClerkClient, ClerkClient } from '@clerk/backend';
import { User, CreateUserInput, GetUserInput } from './user.graphmodel';
import { PrismaService } from '../prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  private clerkClient: ClerkClient;

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    // Create user in Clerk
    const clerkUser = await this.clerkClient.users.createUser({
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      username: createUserInput.username,
      emailAddress: [createUserInput.email],
      password: createUserInput.password,
    });

    // Now save user to your database
    const dbUser = await this.prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: createUserInput.email,
        firstName: createUserInput.firstName,
        lastName: createUserInput.lastName,
        username: createUserInput.username,
      },
    });

    return {
      id: dbUser.id as any,
      username: dbUser.username,
      clerkId: clerkUser.id,
      email: createUserInput.email,
      password: '',
      leagues: [],
    };
  }

  async getUser(getUserInput: GetUserInput): Promise<User> {
    // First check if user exists in your database
    let dbUser;

    if (getUserInput.clerkId) {
      dbUser = await this.prisma.user.findUnique({
        where: { clerkId: getUserInput.clerkId },
        include: {
          UserLeague: {
            include: {
              league: true,
            },
          },
        },
      });
    } else if (getUserInput.email) {
      dbUser = await this.prisma.user.findUnique({
        where: { email: getUserInput.email },
        include: {
          UserLeague: {
            include: {
              league: true,
            },
          },
        },
      });
    }

    // If not in DB, try to fetch from Clerk
    if (!dbUser) {
      let clerkUser;

      if (getUserInput.clerkId) {
        clerkUser = await this.clerkClient.users.getUser(getUserInput.clerkId);
      } else if (getUserInput.email) {
        const userList = await this.clerkClient.users.getUserList({
          emailAddress: [getUserInput.email],
        });
        clerkUser = userList.data.length > 0 ? userList.data[0] : null;
      }

      if (!clerkUser) {
        throw new Error('User not found');
      }

      // User exists in Clerk but not in DB, create the DB record
      dbUser = await this.prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          username: clerkUser.username || '',
        },
        include: {
          UserLeague: {
            include: {
              league: true,
            },
          },
        },
      });
    }

    // Return the user from your database
    return {
      id: dbUser.id,
      clerkId: dbUser.clerkId,
      username: dbUser.username,
      email: dbUser.email,
      password: '',
      leagues: dbUser.UserLeague
        ? dbUser.UserLeague.map((ul) => ul.league)
        : [],
    };
  }

  async getAllUsers(limit: number = 20, cursor?: string): Promise<any> {
    const cacheKey = `users:all:${limit}:${cursor || 'start'}`;

    // 1. Retourner le cache s'il existe (Stale-While-Revalidate)
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      console.log(`Cache hit for key: ${cacheKey}`);
      // Refresh cache in background (SWR pattern)
      this.refreshUsersCache(cacheKey, limit, cursor).catch((err) =>
        console.error('Background refresh failed:', err),
      );
      return JSON.parse(cached);
    }

    // 2. Fetch data fresh if not cached
    const result = await this.fetchAllUsersFromDb(limit, cursor);

    // 3. Cache result for 30 seconds (TTL)
    try {
      await this.redis.setex(cacheKey, 30, JSON.stringify(result));
      console.log(`Cache set for key: ${cacheKey} with TTL 30s`);
    } catch (error) {
      console.warn('Failed to cache users data:', error);
      // Continue without caching if Redis fails
    }

    return result;
  }

  private async refreshUsersCache(
    cacheKey: string,
    limit: number,
    cursor?: string,
  ): Promise<void> {
    const result = await this.fetchAllUsersFromDb(limit, cursor);
    await this.redis.setex(cacheKey, 30, JSON.stringify(result));
    console.log(`Cache refreshed in background for key: ${cacheKey}`);
  }

  private async fetchAllUsersFromDb(
    limit: number = 20,
    cursor?: string,
  ): Promise<any> {
    try {
      const dbUsers = await this.prisma.user.findMany({
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          UserLeague: {
            include: {
              league: true,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

      const users = dbUsers.map((dbUser) => ({
        id: dbUser.id,
        clerkId: dbUser.clerkId,
        username: dbUser.username,
        email: dbUser.email,
        password: '',
        leagues: dbUser.UserLeague
          ? dbUser.UserLeague.map((ul) => ul.league)
          : [],
      }));

      return {
        data: users,
        nextCursor: users.length === limit ? users[users.length - 1].id : null,
        hasMore: users.length === limit,
      };
    } catch (error) {
      // Fallback: if cursor is invalid, return first page
      console.warn('Invalid cursor, returning first page:', error);
      const dbUsers = await this.prisma.user.findMany({
        take: limit,
        include: {
          UserLeague: {
            include: {
              league: true,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

      const users = dbUsers.map((dbUser) => ({
        id: dbUser.id,
        clerkId: dbUser.clerkId,
        username: dbUser.username,
        email: dbUser.email,
        password: '',
        leagues: dbUser.UserLeague
          ? dbUser.UserLeague.map((ul) => ul.league)
          : [],
      }));

      return {
        data: users,
        nextCursor: users.length === limit ? users[users.length - 1].id : null,
        hasMore: users.length === limit,
      };
    }
  }
}
