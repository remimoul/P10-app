import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Bet, CreateBetInput, GetBetByUserAndGrandPrixInput } from "./bet.graphmodel";
import { BetService } from "./bet.service";
import { Public } from "src/decorators/public.decorator";
import { UseGuards } from "@nestjs/common";
import { ClerkAuthGuard } from "src/auth/clerk-auth.guard";
import { UUID } from "crypto";
import { PrismaService } from "src/prisma.service";

@Resolver(() => Bet)
export class BetResolver {
    constructor(
        private betService: BetService,
        private prisma: PrismaService,
    ) { }

    @UseGuards(ClerkAuthGuard)
    @Mutation(() => Bet)
    async createBet(
        @Args('createBetInput') betInput: CreateBetInput,
        @Context() context: any,
    ): Promise<Bet> {
        // Get the authenticated user from context
        const clerkId = context.req?.user?.clerkId || context.req?.auth?.userId;

        if (!clerkId) {
            throw new Error('User authentication required to create a league');
        }

        // Find the user's database ID using the clerkId
        const user = await this.prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) {
            throw new Error('User not found in the database');
        }

        let createBet: CreateBetInput = {
            grandPrixId: betInput.grandPrixId,
            pilotId: betInput.pilotId,
            userId: user.id as UUID,
        };
        return this.betService.createBet(createBet);
    }

    @Public()
    @Query(() => Bet)
    async getBet(
        @Args('getBetByUserAndGrandPrixInput') getBetByUserAndGrandPrixInput: GetBetByUserAndGrandPrixInput,
    ): Promise<Bet | null> {
        return this.betService.getBetByUserAndGrandPrix(getBetByUserAndGrandPrixInput);
    }
}
