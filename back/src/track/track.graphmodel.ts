import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";

@ObjectType()
export class Track {
    @Field(type => String)
    id: UUID;

    @Field(type => String)
    name: string;

    @Field(type => String)
    country: string;

    @Field(type => String, { description: "The track's picture URL" })
    pictureTrack: string;

    @Field(type => String, { description: "The country's picture URL" })
    pictureCountry: string;
};
