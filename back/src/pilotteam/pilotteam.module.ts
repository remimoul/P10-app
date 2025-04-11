import { Module } from '@nestjs/common';
import { PilotteamService } from './pilotteam.service';
import { PilotteamResolver } from './pilotteam.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [PilotteamService, PilotteamResolver, PrismaService]
})
export class PilotteamModule { }
