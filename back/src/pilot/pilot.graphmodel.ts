import { Field, ObjectType } from '@nestjs/graphql';
import { UUID } from 'crypto';
// import { Team } from 'src/team/team.graphmodel';
// import { PilotTeam } from 'src/pilotteam/pilotteam.graphmodel';

@ObjectType()
export class Pilot {
    @Field(type => String)
    id: UUID;

    // @Field()
    // name: string;
    //
    // @Field()
    // picture: string;
    //
    // @Field()
    // acronym: string;
    //
    // @Field(type => Team)
    // currentTeam: Team;
    //
    // @Field(type => [PilotTeam])
    // teamHistory: PilotTeam[];
}
