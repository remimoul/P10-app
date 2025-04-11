import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueResolver } from './league.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [LeagueService, LeagueResolver, PrismaService]
})
export class LeagueModule { }
