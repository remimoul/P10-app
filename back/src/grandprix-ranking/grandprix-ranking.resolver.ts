import { Resolver } from "@nestjs/graphql";
import { GrandPrixRanking } from "./grandprix-ranking.graphmodel";
import { GrandprixRankingService } from "./grandprix-ranking.service";

@Resolver(() => GrandPrixRanking)
export class GrandprixResolver {
    constructor(
        private avatarService: GrandprixRankingService,
    ) { }
}
