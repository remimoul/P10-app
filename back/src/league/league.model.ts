import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";
import { User } from "../user/user.model";
import { Avatar } from "../avatar/avatar.model";

@ObjectType()
export class League {
    @Field(type => String)
    id: UUID;

    @Field(type => String)
    name: string;

    @Field(type => User)
    admin: User;

    @Field(type => Boolean)
    private: boolean;

    @Field(type => User)
    joinCode: string;

    @Field(type => Avatar)
    avatar: Avatar;

    @Field(type => [User])
    members: User[];
};
