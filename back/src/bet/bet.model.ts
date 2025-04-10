import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { GrandPrix } from "src/grandprix/grandprix.model";
import { Pilot } from "src/pilot/pilot.model";
import { User } from "src/user/user.model";

@ObjectType()
class Bet {
    @Field(type => String)
    id: UUID;

    @Field(type => User)
    user: User;

    @Field(type => GrandPrix)
    grandPrix: GrandPrix;

    @Field(type => Pilot)
    pilot: Pilot;

    @Field(type => Int, { nullable: true })
    points?: number;
};