import { Resolver } from "@nestjs/graphql";
import { Pilot } from "./pilot.graphmodel";
import { PilotService } from "./pilot.service";

@Resolver(() => Pilot)
export class PilotResolver {
    constructor(
        private avatarService: PilotService,
    ) { }
}
