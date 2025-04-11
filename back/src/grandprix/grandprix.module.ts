import { Module } from '@nestjs/common';
import { GrandprixService } from './grandprix.service';
import { GrandprixResolver } from './grandprix.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [GrandprixService, GrandprixResolver, PrismaService]
})
export class GrandprixModule { }
