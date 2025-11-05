import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Public } from 'src/decorators/public.decorator';
import {
  Pilot,
  CreatePilotInput,
  AddPilotToTeamInput,
  CreatePilotResponse,
} from './pilot.graphmodel';
import { PilotService } from './pilot.service';

@Resolver(() => Pilot)
export class PilotResolver {
  constructor(private pilotService: PilotService) {}

  @Public()
  @Query(() => [Pilot])
  async getAllPilots(): Promise<Pilot[]> {
    return this.pilotService.getAllPilots();
  }

  @Public()
  @Query(() => Pilot)
  async getPilot(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Pilot> {
    return this.pilotService.getPilotById(id);
  }

  @Public()
  @Mutation(() => Pilot)
  async createPilot(
    @Args('createPilotInput') createPilotInput: CreatePilotInput,
  ): Promise<Pilot> {
    return this.pilotService.createPilot(createPilotInput);
  }

  @Public()
  @Mutation(() => CreatePilotResponse)
  async addPilotToTeam(
    @Args('input') input: AddPilotToTeamInput,
  ): Promise<CreatePilotResponse> {
    const result = await this.pilotService.addPilotToTeam(
      input.pilotId,
      input.teamId,
      input.year,
    );
    return {
      success: result.success,
      message: result.message,
    };
  }
}
