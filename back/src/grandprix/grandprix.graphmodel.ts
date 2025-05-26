import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { GrandPrixRanking } from "src/grandprix-ranking/grandprix-ranking.graphmodel";
// import { Pilot } from "src/pilot/pilot.graphmodel";
// import { Track } from "src/track/track.graphmodel";

@ObjectType()
export class GrandPrix {
    @Field(type => String)
    id: UUID;

    // @Field(type => String)
    // season: string;
    //
    // @Field(type => Date)
    // date: Date;
    //
    // @Field(type => Date)
    // time: Date;
    //
    // @Field(type => Track)
    // track: Track;
    //
    // @Field(type => [Pilot])
    // pilots: Pilot[];

    @Field(type => [GrandPrixRanking], { nullable: true })
    ranking?: GrandPrixRanking[];
};
