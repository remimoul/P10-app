import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePilotInput, Pilot } from './pilot.graphmodel';

@Injectable()
export class PilotService {
  constructor(private prisma: PrismaService) {}

  async createPilot(createPilotInput: CreatePilotInput): Promise<Pilot> {
    try {
      const pilot = await this.prisma.pilot.create({
        data: {
          name: createPilotInput.name,
          picture: createPilotInput.picture,
          acronym: createPilotInput.acronym,
        },
      });

      return {
        id: pilot.id as any,
        name: pilot.name,
        picture: pilot.picture,
        acronym: pilot.acronym,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to create pilot: ${error.message}`);
    }
  }

  async getAllPilots(): Promise<Pilot[]> {
    const pilots = await this.prisma.pilot.findMany();
    return pilots.map((pilot) => ({
      id: pilot.id as any,
      name: pilot.name,
      picture: pilot.picture,
      acronym: pilot.acronym,
    }));
  }

  async getPilotById(id: string): Promise<Pilot> {
    const pilot = await this.prisma.pilot.findUnique({
      where: { id },
    });

    if (!pilot) {
      throw new NotFoundException(`Pilot with ID ${id} not found`);
    }

    return {
      id: pilot.id as any,
      name: pilot.name,
      picture: pilot.picture,
      acronym: pilot.acronym,
    };
  }

  async addPilotToTeam(
    pilotId: string,
    teamId: string,
    year: string,
  ): Promise<{ success: boolean; message: string }> {
    // Vérifier que le pilot existe
    const pilot = await this.prisma.pilot.findUnique({
      where: { id: pilotId },
    });

    if (!pilot) {
      throw new NotFoundException(`Pilot with ID ${pilotId} not found`);
    }

    // Vérifier que la team existe
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    // Vérifier que la relation n'existe pas déjà
    const existingPilotTeam = await this.prisma.pilotTeam.findFirst({
      where: {
        pilotId: pilotId,
        teamId: teamId,
        year: year,
      },
    });

    if (existingPilotTeam) {
      throw new BadRequestException(
        `Pilot ${pilot.name} is already associated with team ${team.name} for year ${year}`,
      );
    }

    try {
      await this.prisma.pilotTeam.create({
        data: {
          pilotId: pilotId,
          teamId: teamId,
          year: year,
        },
      });

      return {
        success: true,
        message: `Pilot ${pilot.name} successfully added to team ${team.name} for year ${year}`,
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to add pilot to team: ${error.message}`,
      );
    }
  }
}
