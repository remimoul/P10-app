import { Args, Query, Resolver } from "@nestjs/graphql";
import { Avatar } from "./avatar.graphmodel";
import { AvatarService } from "./avatar.service";
import { UUID } from "crypto";

@Resolver(() => Avatar)
export class AvatarResolver {
    constructor(
        private avatarService: AvatarService,
    ) { }

    @Query(() => [Avatar])
    async getAvatars() {
        return this.avatarService.getAvatars();
    }

    @Query(() => Avatar)
    async getAvatar(@Args('id', { type: () => String }) id: UUID) {
        return this.avatarService.getAvatar(id);
    }
}
