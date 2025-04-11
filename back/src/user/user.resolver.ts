import { Resolver } from "@nestjs/graphql";
import { User } from "./user.graphmodel";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
    constructor(
        private userService: UserService,
    ) { }
}
