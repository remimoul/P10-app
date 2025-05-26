import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueResolver } from './league.resolver';
import { PrismaService } from '../prisma.service';
import { ClerkClientProvider } from '../providers/clerk-client.provider';

@Module({
  providers: [
    LeagueResolver,
    LeagueService,
    PrismaService,
    ClerkClientProvider,
  ],
  exports: [LeagueService],
})
export class LeagueModule {}
