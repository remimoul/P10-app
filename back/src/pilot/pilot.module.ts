import { Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotResolver } from './pilot.resolver';
import { PilotController } from './pilot.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PilotController],
  providers: [PilotService, PilotResolver, PrismaService],
})
export class PilotModule {}
