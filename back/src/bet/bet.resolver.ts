import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Bet, CreateBetInput, GetBetByUserAndGrandPrixInput } from "./bet.graphmodel";
import { BetService } from "./bet.service";
import { Public } from "src/decorators/public.decorator";

@Resolver(() => Bet)
export class BetResolver {
    constructor(
        private betService: BetService,
    ) { }

    @Public()
    @Mutation(() => Bet)
    async createBet(
        @Args('createBetInput') betInput: CreateBetInput,
    ): Promise<Bet> {
        return this.betService.createBet(betInput);
    }

    @Public()
    @Query(() => Bet)
    async getBet(
        @Args('getBetByUserAndGrandPrixInput') getBetByUserAndGrandPrixInput: GetBetByUserAndGrandPrixInput,
    ): Promise<Bet | null> {
        return this.betService.getBetByUserAndGrandPrix(getBetByUserAndGrandPrixInput);
    }
}
