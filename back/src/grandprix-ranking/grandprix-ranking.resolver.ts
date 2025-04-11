import { Resolver } from "@nestjs/graphql";
import { GrandPrixRanking } from "./grandprix-ranking.graphmodel";
import { GrandprixRankingService } from "./grandprix-ranking.service";

@Resolver(() => GrandPrixRanking)
export class GrandprixRankingResolver {
    constructor(
        private grandPrixRankingService: GrandprixRankingService,
    ) { }
}
