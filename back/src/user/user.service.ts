import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClerkClient, ClerkClient } from '@clerk/backend';
import { User, CreateUserInput, GetUserInput } from './user.graphmodel';
import { PrismaService } from '../prisma.service';
import { PrometheusService } from '../prometheus.service'; // ✅ Importe PrometheusService

@Injectable()
export class UserService implements OnModuleInit {
  private clerkClient: ClerkClient;

  constructor(
    private prisma: PrismaService,
    private prometheusService: PrometheusService, // ✅ Injecte PrometheusService
  ) {
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  async onModuleInit() {
    console.log('🚀 UserService initialized');
    await this.updateUserCount();
  }

  async updateUserCount(): Promise<number> {
    const count = await this.prisma.user.count();
    console.log(`📊 Found ${count} users in database`);

    // ✅ Utilise PrometheusService pour mettre à jour la métrique
    this.prometheusService.resetAndSetUserCount(count);

    return count;
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

    // ✅ Met à jour la métrique après création
    await this.updateUserCount();

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
}
