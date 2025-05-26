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
    ) { }

    async createBet(betInput: CreateBetInput): Promise<Bet> {
        try {
            const bet = await this.prisma.bet.create({
                data: {
                    grandPrixId: betInput.grandPrixId,
                    pilotP10Id: betInput.pilotId,
                    userId: betInput.userId,
                },
            });

            return {
                id: bet.id as UUID,
                user: await this.userService.getUser({ clerkId: bet.userId }),
                grandPrix: {
                    id: bet.grandPrixId as UUID,
                },
                pilot: {
                    id: bet.pilotP10Id as UUID,
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
}
