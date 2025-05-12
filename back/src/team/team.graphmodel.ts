import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { PilotTeam } from "src/pilotteam/pilotteam.graphmodel";

@ObjectType()
export class Team {
    @Field(type => String)
    id: UUID;

    @Field(type => String)
    name: string;

    @Field({ description: "Team's logo URL" })
    logo: string;

    @Field({ description: "Team's color in html format" })
    color: string;

    @Field(type => [PilotTeam], { nullable: true })
    pilots: PilotTeam[];
};
