import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { Pilot } from "./pilot";
import { GrandPrix } from "./grandprix";

@ObjectType()
export class GrandPrixRanking {
    @Field(type => String)
    id: UUID;

    @Field(type => GrandPrix)
    grandPrix: GrandPrix;

    @Field(type => Pilot)
    pilot: Pilot;

    @Field(type => Int)
    position: number;

    @Field(type => Boolean)
    isDNF: boolean;
};