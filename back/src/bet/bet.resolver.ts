import { Resolver } from "@nestjs/graphql";
import { Bet, CreateBetInput } from "./bet.graphmodel";
import { BetService } from "./bet.service";

@Resolver(() => Bet)
export class BetResolver {
    constructor(
        private betService: BetService,
    ) { }

    async createBet(betInput: CreateBetInput): Promise<Bet> {
        return this.betService.createBet(betInput);
    }
}
