import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { Pilot } from "./pilot";
import { Track } from "./track";
import { GrandPrixRanking } from "./grandprixRanking";

@ObjectType()
export class GrandPrix {
    @Field(type => String)
    id: UUID;

    @Field(type => String)
    season: string;

    @Field(type => Date)
    date: Date;

    @Field(type => Date)
    time: Date;

    @Field(type => Track)
    track: Track;

    @Field(type => [Pilot])
    pilots: Pilot[];

    @Field(type => [GrandPrixRanking], { nullable: true })
    ranking?: GrandPrixRanking[];
};