import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, CreateUserInput, GetUserInput } from './user.graphmodel';
import { UserService } from './user.service';
import { Public } from 'src/decorators/public.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }
  @Public()
  @Query(() => User, { name: 'user' })
  async getUser(
    @Args('getUserInput') getUserInput: GetUserInput,
  ): Promise<User> {
    return this.userService.getUser(getUserInput);
  }

  //   @Query(() => [User])
  //   async getAllUsers(): Promise<User[]> {
  //     return this.userService.getAllUsers();
  //   }
}
