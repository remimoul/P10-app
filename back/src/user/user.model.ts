import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { Avatar } from "./avatar";
import { League } from "./league";

@ObjectType()
export class User {
    @Field(type => String)
    id: UUID;

    @Field(type => String)
    clerkId: string;

    @Field({ nullable: true })
    @Field(type => Avatar)
    avatar?: Avatar;

    @Field({ nullable: true })
    @Field(type => [League])
    leagues: League[];
};
