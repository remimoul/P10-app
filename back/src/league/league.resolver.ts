import { Resolver } from "@nestjs/graphql";
import { League } from "./league.graphmodel";
import { LeagueService } from "./league.service";

@Resolver(() => League)
export class LeagueResolver {
    constructor(
        private avatarService: LeagueService,
    ) { }
}
