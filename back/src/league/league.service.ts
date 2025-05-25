import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  League,
  CreateLeagueInput,
  GetLeagueInput,
  DeleteLeagueInput,
  UpdateLeagueInput,
  JoinLeagueInput,
} from './league.graphmodel';
import { UUID } from 'crypto';

@Injectable()
export class LeagueService {
  constructor(private prisma: PrismaService) {}

  async createLeague(
    createLeagueInput: CreateLeagueInput,
    userId: string,
  ): Promise<League> {
    // Generate a random 8-character alphanumeric join code
    const generateUniqueJoinCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    let joinCode = generateUniqueJoinCode();

    try {
      return await this.prisma.$transaction(async (prisma) => {
        // 1. Create the league
        const league = await prisma.league.create({
          data: {
            name: createLeagueInput.name,
            private: createLeagueInput.private ?? false,
            joinCode: joinCode,
          },
        });

        // 2. Create the UserLeague entry for the admin
        const userLeague = await prisma.userLeague.create({
          data: {
            userId: userId,
            leagueId: league.id,
            isAdmin: true,
          },
          include: {
            user: true,
          },
        });

        // 3. Return the league with user data
        return {
          id: league.id as any,
          name: league.name,
          private: league.private,
          joinCode: league.joinCode,
          avatar: null,
          admin: {
            id: userLeague.user.id as UUID,
            clerkId: userLeague.user.clerkId,
            username: userLeague.user.username,
            firstName: userLeague.user.firstName,
            lastName: userLeague.user.lastName,
            email: userLeague.user.email,
            password: '',
            leagues: [],
          },
          members: [
            {
              id: userLeague.user.id as UUID,
              clerkId: userLeague.user.clerkId,
              username: userLeague.user.username,
              firstName: userLeague.user.firstName,
              lastName: userLeague.user.lastName,
              email: userLeague.user.email,
              password: '',
              leagues: [],
            },
          ],
        };
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('joinCode')) {
        throw new Error(
          'Failed to generate a unique join code. Please try again.',
        );
      }
      throw error;
    }
  }

  async getAllLeagues(): Promise<League[]> {
    const leagues = await this.prisma.league.findMany({
      include: {
        avatar: true,
        UserLeague: {
          include: {
            user: true,
          },
        },
      },
    });

    return leagues.map((league) => {
      // Trouver l'utilisateur admin parmi les UserLeague
      const adminUserLeague = league.UserLeague.find((ul) => ul.isAdmin);

      return {
        id: league.id as any,
        name: league.name,
        private: league.private,
        joinCode: league.joinCode,
        avatar: league.avatar
          ? {
              id: league.avatar.id as UUID,
              url: league.avatar.picture,
            }
          : null,
        // Définir l'administrateur si trouvé
        admin: adminUserLeague?.user
          ? {
              id: adminUserLeague.user.id as UUID,
              clerkId: adminUserLeague.user.clerkId,
              username: adminUserLeague.user.username,
              firstName: adminUserLeague.user.firstName,
              lastName: adminUserLeague.user.lastName,
              email: adminUserLeague.user.email,
              password: '',
              leagues: [],
            }
          : null,
        members: league.UserLeague.map((userLeague) => ({
          id: userLeague.user.id as UUID,
          clerkId: userLeague.user.clerkId,
          username: userLeague.user.username,
          firstName: userLeague.user.firstName,
          lastName: userLeague.user.lastName,
          email: userLeague.user.email,
          password: '',
          leagues: [],
        })),
      };
    });
  }

  async joinLeague(
    joinLeagueInput: JoinLeagueInput,
    userId: string,
  ): Promise<League> {
    const { leagueId, joinCode } = joinLeagueInput;

    // 1. Vérifier que l'ID de la league est fourni
    if (!leagueId) {
      throw new BadRequestException('League ID is required');
    }

    // 2. Trouver la league avec l'ID fourni
    const league = await this.prisma.league.findUnique({
      where: { id: leagueId },
      include: {
        avatar: true,
        UserLeague: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!league) {
      throw new NotFoundException(`League with ID ${leagueId} not found`);
    }

    // 3. Vérifier si le code d'accès est requis (league privée) et valide
    if (league.private) {
      if (!joinCode) {
        throw new BadRequestException(
          'Join code is required for private leagues',
        );
      }

      if (joinCode !== league.joinCode) {
        throw new BadRequestException('Invalid join code for this league');
      }
    }

    // 4. Vérifier si l'utilisateur est déjà membre de cette league
    const existingMembership = await this.prisma.userLeague.findFirst({
      where: {
        userId: userId,
        leagueId: league.id,
      },
    });

    if (existingMembership) {
      throw new BadRequestException('You are already a member of this league');
    }

    // 5. Ajouter l'utilisateur à la league
    try {
      await this.prisma.userLeague.create({
        data: {
          userId: userId,
          leagueId: league.id,
          isAdmin: false,
        },
      });

      // 6. Récupérer la league mise à jour avec tous les membres
      const updatedLeague = await this.prisma.league.findUnique({
        where: { id: league.id },
        include: {
          avatar: true,
          UserLeague: {
            include: {
              user: true,
            },
          },
        },
      });

      // 7. Format de retour adapté au modèle League
      return {
        id: updatedLeague.id as any,
        name: updatedLeague.name,
        private: updatedLeague.private,
        joinCode: updatedLeague.joinCode,
        avatar: updatedLeague.avatar
          ? {
              id: updatedLeague.avatar.id as UUID,
              url: updatedLeague.avatar.picture,
            }
          : null,
        admin: updatedLeague.UserLeague.find((ul) => ul.isAdmin)?.user
          ? {
              id: updatedLeague.UserLeague.find((ul) => ul.isAdmin).user
                .id as UUID,
              clerkId: updatedLeague.UserLeague.find((ul) => ul.isAdmin).user
                .clerkId,
              email: updatedLeague.UserLeague.find((ul) => ul.isAdmin).user
                .email,
              password: '',
              leagues: [],
            }
          : null,
        members: updatedLeague.UserLeague.map((userLeague) => ({
          id: userLeague.user.id as UUID,
          clerkId: userLeague.user.clerkId,
          username: userLeague.user.username,
          firstName: userLeague.user.firstName,
          lastName: userLeague.user.lastName,
          email: userLeague.user.email,
          password: '',
          leagues: [],
        })),
      };
    } catch (error) {
      throw new Error(`Failed to join league: ${error.message}`);
    }
  }

  async getLeague(getLeagueInput: GetLeagueInput): Promise<League> {
    const { id, name } = getLeagueInput;

    // Construire la condition de recherche
    const whereCondition: any = {};
    if (id) whereCondition.id = id;
    if (name) whereCondition.name = name;

    // Rechercher la league
    const league = await this.prisma.league.findFirst({
      where: whereCondition,
      include: {
        avatar: true,
        UserLeague: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!league) {
      throw new NotFoundException('League not found');
    }

    // Trouver l'administrateur
    const adminUserLeague = league.UserLeague.find((ul) => ul.isAdmin);

    // Retourner le résultat formaté
    return {
      id: league.id as any,
      name: league.name,
      private: league.private,
      joinCode: league.joinCode,
      avatar: league.avatar
        ? {
            id: league.avatar.id as UUID,
            url: league.avatar.picture,
          }
        : null,
      admin: adminUserLeague?.user
        ? {
            id: adminUserLeague.user.id as UUID,
            clerkId: adminUserLeague.user.clerkId,
            email: adminUserLeague.user.email,
            password: '',
            leagues: [],
          }
        : null,
      members: league.UserLeague.map((userLeague) => ({
        id: userLeague.user.id as UUID,
        clerkId: userLeague.user.clerkId,
        username: userLeague.user.username,
        firstName: userLeague.user.firstName,
        lastName: userLeague.user.lastName,
        email: userLeague.user.email,
        password: '',
        leagues: [],
      })),
    };
  }
}
