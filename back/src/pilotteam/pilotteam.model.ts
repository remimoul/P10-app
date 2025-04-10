
import { Field, ObjectType } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { Pilot } from './pilot';
import { Team } from './team';

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

