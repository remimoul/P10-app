import { Resolver } from "@nestjs/graphql";
import { PilotTeam } from "./pilotteam.graphmodel";
import { PilotteamService } from "./pilotteam.service";

@Resolver(() => PilotTeam)
export class PilotteamResolver {
    constructor(
        private pilotTeamService: PilotteamService,
    ) { }
}
