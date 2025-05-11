import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  League,
  CreateLeagueInput,
  GetLeagueInput,
  DeleteLeagueInput,
  UpdateLeagueInput,
  JoinLeagueInput,
} from './league.graphmodel';
import { UUID } from 'crypto';

@Injectable()
export class LeagueService {
  constructor(private prisma: PrismaService) {}

  async createLeague(
    createLeagueInput: CreateLeagueInput,
    userId: string,
  ): Promise<League> {
    // Generate a random 8-character alphanumeric join code
    const generateUniqueJoinCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    let joinCode = generateUniqueJoinCode();

    // Create the league and associate the user in a transaction
    try {
      // Use Prisma transaction to ensure both operations succeed or fail together
      return await this.prisma.$transaction(async (prisma) => {
        // 1. Create the league
        const league = await prisma.league.create({
          data: {
            name: createLeagueInput.name,
            private: createLeagueInput.private ?? false,
            joinCode: joinCode,
          },
        });

        // 2. Create the UserLeague entry for the admin
        const userLeague = await prisma.userLeague.create({
          data: {
            userId: userId,
            leagueId: league.id,
            isAdmin: true, // Mark this user as the admin
          },
          include: {
            user: true,
          },
        });

        // 3. Return the league with user data
        return {
          id: league.id as any,
          name: league.name,
          private: league.private,
          joinCode: league.joinCode,
          avatar: null,
          admin: {
            id: userLeague.user.id as UUID,
            clerkId: userLeague.user.clerkId,
            username: userLeague.user.username,
            firstName: userLeague.user.firstName,
            lastName: userLeague.user.lastName,
            email: userLeague.user.email,
            password: '',
            leagues: [],
          },
          members: [
            {
              id: userLeague.user.id as UUID,
              clerkId: userLeague.user.clerkId,
              username: userLeague.user.username,
              firstName: userLeague.user.firstName,
              lastName: userLeague.user.lastName,
              email: userLeague.user.email,
              password: '',
              leagues: [],
            },
          ],
        };
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('joinCode')) {
        throw new Error(
          'Failed to generate a unique join code. Please try again.',
        );
      }
      throw error;
    }
  }

  async getLeague(getLeagueInput: GetLeagueInput): Promise<League> {
    const league = await this.prisma.league.findUnique({
      where: {
        id: getLeagueInput.id,
      },
      include: {
        avatar: true,
        UserLeague: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!league) {
      throw new Error('League not found');
    }

    return {
      id: league.id as any,
      name: league.name,
      private: league.private,
      joinCode: league.joinCode,
      avatar: league.avatar
        ? {
            id: league.avatar.id as UUID,
            url: league.avatar.picture,
          }
        : null,
      admin: null,
      members: league.UserLeague.map((userLeague) => ({
        id: userLeague.user.id as UUID,
        clerkId: userLeague.user.clerkId,
        username: userLeague.user.username,
        firstName: userLeague.user.firstName,
        lastName: userLeague.user.lastName,
        email: userLeague.user.email,
        password: '',
        leagues: [],
      })),
    };
  }
}
