import { Resolver } from "@nestjs/graphql";
import { GrandPrix } from "./grandprix.graphmodel";
import { GrandprixService } from "./grandprix.service";

@Resolver(() => GrandPrix)
export class GrandprixResolver {
    constructor(
        private avatarService: GrandprixService,
    ) { }
}
