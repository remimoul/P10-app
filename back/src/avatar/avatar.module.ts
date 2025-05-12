import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarResolver } from './avatar.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [AvatarService, AvatarResolver, PrismaService]
})
export class AvatarModule { }
