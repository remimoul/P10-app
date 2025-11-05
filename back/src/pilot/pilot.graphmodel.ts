import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { UUID } from 'crypto';

@ObjectType()
export class Pilot {
  @Field((type) => String)
  id: UUID;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  acronym?: string;
}

@InputType()
export class CreatePilotInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  acronym?: string;
}

@InputType()
export class AddPilotToTeamInput {
  @Field()
  pilotId: string;

  @Field()
  teamId: string;

  @Field()
  year: string;
}

@ObjectType()
export class CreatePilotResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  pilot?: Pilot;
}
