import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";

@ObjectType()
export class Avatar {
    @Field(type => String)
    id: UUID;

    @Field(type => String)
    url: string;
};
