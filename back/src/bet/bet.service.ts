import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Bet, CreateBetInput } from './bet.graphmodel';
import { UUID } from 'crypto';
import { UserService } from 'src/user/user.service';

function mapBetWithIncludes(bet: {
  id: string;
  userId: string;
  grandPrixId: string;
  pilotP10Id: string;
  user: {
    id: string;
    clerkId: string;
    username: string;
    email: string;
    UserLeague?: { league: unknown }[];
  };
}) {
  return {
    id: bet.id as UUID,
    user: {
      id: bet.user.id as UUID,
      clerkId: bet.user.clerkId,
      username: bet.user.username,
      email: bet.user.email,
      password: '',
      leagues: (bet.user.UserLeague ? bet.user.UserLeague.map((ul) => ul.league) : []) as Bet['user']['leagues'],
    },
    grandPrix: { id: bet.grandPrixId as UUID },
    pilot: { id: bet.pilotP10Id as UUID },
  } as Bet;
}

@Injectable()
export class BetService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createBet(betInput: CreateBetInput): Promise<Bet> {
    try {
      const bet = await this.prisma.bet.create({
        data: {
          grandPrixId: betInput.grandPrixId,
          pilotP10Id: betInput.pilotId,
          userId: betInput.userId,
        },
        include: {
          user: {
            include: {
              UserLeague: { include: { league: true } },
            },
          },
        },
      });

      return mapBetWithIncludes(bet);
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('joinCode')) {
        throw new Error(
          'Failed to generate a unique join code. Please try again.',
        );
      }
      throw error;
    }
  }

  async getBetByUserAndGrandPrix(
    getBetByUserAndGrandPrixInput: { grandPrixId: UUID; userId: UUID },
  ): Promise<Bet | null> {
    const bet = await this.prisma.bet.findFirst({
      where: {
        grandPrixId: getBetByUserAndGrandPrixInput.grandPrixId,
        userId: getBetByUserAndGrandPrixInput.userId,
      },
      include: {
        user: {
          include: {
            UserLeague: { include: { league: true } },
          },
        },
      },
    });

    if (!bet) return null;

    return mapBetWithIncludes(bet);
  }
}
