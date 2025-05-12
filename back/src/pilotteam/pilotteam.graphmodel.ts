
import { Field, ObjectType } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { Pilot } from 'src/pilot/pilot.graphmodel';
import { Team } from 'src/team/team.graphmodel';

@ObjectType()
export class PilotTeam {
    @Field(type => String)
    id: UUID;

    @Field(type => Pilot)
    pilot: Pilot;

    @Field(type => Team)
    team: Team;

    @Field()
    year: string;
}

