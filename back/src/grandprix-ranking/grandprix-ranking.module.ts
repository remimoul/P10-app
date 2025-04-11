import { Module } from '@nestjs/common';
import { GrandprixRankingService } from './grandprix-ranking.service';
import { GrandprixRankingResolver } from './grandprix-ranking.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [GrandprixRankingService, GrandprixRankingResolver, PrismaService]
})
export class GrandprixRankingModule { }
