import {
  Mutation,
  Query,
  Parent,
  ResolveField,
  Resolver,
  Args,
} from '@nestjs/graphql';
import { PilotTeam } from './pilotteam.graphmodel';
import { PilotteamService } from './pilotteam.service';

@Resolver(() => PilotTeam)
export class PilotteamResolver {
  constructor(private readonly pilotTeamService: PilotteamService) {}

  @Query(() => [PilotTeam])
  async getPilotteams() {
    return this.pilotTeamService.getAllPilotteams();
  }

  @ResolveField(() => String)
  async getPilotteamName(@Parent() pilotTeam: PilotTeam) {
    return pilotTeam.id;
  }

  @Mutation(() => PilotTeam)
  async createPilotteam(
    @Args('pilotId', { type: () => String }) pilotId: string,
    @Args('teamId', { type: () => String }) teamId: string,
    @Args('year', { type: () => String }) year: string,
  ) {
    return this.pilotTeamService.createPilotteam(pilotId, teamId, year);
  }
}
