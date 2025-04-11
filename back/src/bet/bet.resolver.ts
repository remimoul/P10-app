import { Resolver } from "@nestjs/graphql";
import { Bet } from "./bet.graphmodel";
import { BetService } from "./bet.service";

@Resolver(() => Bet)
export class BetResolver {
    constructor(
        private avatarService: BetService,
    ) { }
}
