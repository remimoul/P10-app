import { Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotResolver } from './pilot.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [PilotService, PilotResolver, PrismaService]
})
export class PilotModule { }
