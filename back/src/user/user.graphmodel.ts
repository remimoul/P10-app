import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { Avatar } from 'src/avatar/avatar.graphmodel';
import { League } from 'src/league/league.graphmodel';

@ObjectType()
export class User {
  @Field((type) => String)
  id: UUID;

  @Field((type) => String)
  clerkId: string;

  @Field({ nullable: true })
  @Field((type) => Avatar)
  avatar?: Avatar;

  @Field((type) => String)
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field((type) => [League], { nullable: true })
  leagues: League[];
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class GetUserInput {
  @Field({ nullable: true })
  clerkId?: string;

  @Field({ nullable: true })
  email?: string;
}
