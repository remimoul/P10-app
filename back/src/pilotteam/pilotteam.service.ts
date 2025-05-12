import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PilotteamService {
  constructor(private readonly prisma: PrismaService) {}

  async getPilotteam(id: UUID) {
    return this.prisma.pilotTeam.findUnique({
      where: { id },
    });
  }

  async getAllPilotteams() {
    return this.prisma.pilotTeam.findMany();
  }

  async createPilotteam(pilot: string, team: string, year: string) {
    return this.prisma.pilotTeam.create({
      data: {
        pilot: { connect: { id: pilot } },
        team: { connect: { id: team } },
        year,
      },
    });
  }
}
