import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { User } from 'src/user/user.graphmodel';
import { Avatar } from 'src/avatar/avatar.graphmodel';

@ObjectType()
export class League {
  @Field((type) => String)
  id: UUID;

  @Field((type) => String)
  name: string;

  @Field((type) => User)
  admin: User;

  @Field((type) => Boolean)
  private: boolean;

  @Field((type) => String, { nullable: true })
  joinCode?: string;

  @Field((type) => Avatar)
  avatar: Avatar;

  @Field((type) => [User], { nullable: true })
  members: User[];
}

@InputType()
export class CreateLeagueInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  private?: boolean;
}

@InputType()
export class GetLeagueInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  adminId?: string;
}

@InputType()
export class UpdateLeagueInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  private?: boolean;

  @Field({ nullable: true })
  joinCode?: string;

  @Field({ nullable: true })
  avatar?: string;
}

@InputType()
export class DeleteLeagueInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  adminId?: string;
}

@InputType()
export class JoinLeagueInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  joinCode?: string;
}
