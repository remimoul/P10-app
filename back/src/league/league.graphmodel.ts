import { Field, ObjectType } from '@nestjs/graphql';
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

  @Field((type) => User)
  joinCode: string;

  @Field((type) => Avatar)
  avatar: Avatar;

  @Field((type) => [User], { nullable: true })
  members: User[];
}
