import { Resolver } from "@nestjs/graphql";
import { Track } from "./track.graphmodel";
import { TrackService } from "./track.service";

@Resolver(() => Track)
export class TrackResolver {
    constructor(
        private avatarService: TrackService,
    ) { }
}
