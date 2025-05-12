import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [TrackService, TrackResolver, PrismaService]
})
export class TrackModule { }
