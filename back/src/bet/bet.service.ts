import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Bet, CreateBetInput } from './bet.graphmodel';
import { UUID } from 'crypto';
import { UserService } from 'src/user/user.service';
// import { GrandprixService } from 'src/grandprix/grandprix.service';
// import { PilotService } from 'src/pilot/pilot.service';

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
          pilotP10: true,
        },
      });

      const pilotData = await this.prisma.pilot.findUnique({
        where: { id: bet.pilotP10Id },
      });

      return {
        id: bet.id as UUID,
        user: await this.userService.getUser({ clerkId: bet.userId }),
        grandPrix: {
          id: bet.grandPrixId as UUID,
        },
        pilot: {
          id: pilotData.id as UUID,
          name: pilotData.name,
          picture: pilotData.picture,
          acronym: pilotData.acronym,
        },
      };
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('joinCode')) {
        throw new Error(
          'Failed to generate a unique join code. Please try again.',
        );
      }
      throw error;
    }
  }

  async getBetByUserAndGrandPrix(getBetByUserAndGrandPrixInput: {
    grandPrixId: UUID;
    userId: UUID;
  }): Promise<Bet | null> {
    const bet = await this.prisma.bet.findFirst({
      where: {
        grandPrixId: getBetByUserAndGrandPrixInput.grandPrixId,
        userId: getBetByUserAndGrandPrixInput.userId,
      },
      include: {
        pilotP10: true,
      },
    });

    if (!bet) {
      return null;
    }

    return {
      id: bet.id as UUID,
      user: await this.userService.getUser({ clerkId: bet.userId }),
      grandPrix: {
        id: bet.grandPrixId as UUID,
      },
      pilot: {
        id: bet.pilotP10.id as UUID,
        name: bet.pilotP10.name,
        picture: bet.pilotP10.picture,
        acronym: bet.pilotP10.acronym,
      },
    };
  }
}
