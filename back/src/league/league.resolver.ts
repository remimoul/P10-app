import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {
  League,
  CreateLeagueInput,
  GetLeagueInput,
  DeleteLeagueInput,
  UpdateLeagueInput,
  JoinLeagueInput,
} from './league.graphmodel';
import { LeagueService } from './league.service';
import { Public } from 'src/decorators/public.decorator';
import { PrismaService } from 'src/prisma.service';

@Resolver(() => League)
export class LeagueResolver {
  constructor(
    private leagueService: LeagueService,
    private prisma: PrismaService,
  ) {}

  @Public()
  @Mutation(() => League)
  async createLeague(
    @Args('createLeagueInput') createLeagueInput: CreateLeagueInput,
    @Context() context: any,
  ): Promise<League> {
    // Get the authenticated user from context
    const clerkId = context.req.user?.clerkId || context.req.auth?.userId;

    if (!clerkId) {
      throw new Error('User authentication required to create a league');
    }

    // Find the user's database ID using the clerkId
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new Error('User not found in the database');
    }

    // Use the database user ID for league creation
    return this.leagueService.createLeague(createLeagueInput, user.id);
  }

  // Méthode de développement pour créer une ligue avec un ID utilisateur spécifique
  @Public()
  @Mutation(() => League)
  async createLeagueWithUserId(
    @Args('createLeagueInput') createLeagueInput: CreateLeagueInput,
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<League> {
    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`Utilisateur avec ID ${userId} non trouvé`);
    }

    // Créer la ligue avec l'ID utilisateur fourni
    return this.leagueService.createLeague(createLeagueInput, userId);
  }

  @Public()
  @Query(() => [League])
  async getAllLeagues(): Promise<League[]> {
    return this.leagueService.getAllLeagues();
  }

  @Public()
  @Mutation(() => League)
  async joinLeague(
    @Args('joinLeague') joinLeagueInput: JoinLeagueInput,
    @Context() context: any,
  ): Promise<League> {
    // Get the authenticated user from context
    const clerkId = context.req.user?.clerkId || context.req.auth?.userId;

    if (!clerkId) {
      throw new Error('User authentication required to join a league');
    }

    // Find the user's database ID using the clerkId
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new Error('User not found in the database');
    }

    // Join the league with conditional code requirement
    return this.leagueService.joinLeague(joinLeagueInput, user.id);
  }

  @Public()
  @Mutation(() => League)
  async joinLeagueWithUserId(
    @Args('joinLeagueInput') joinLeagueInput: JoinLeagueInput,
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<League> {
    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`Utilisateur avec ID ${userId} non trouvé`);
    }

    // Rejoindre la ligue avec l'ID utilisateur fourni
    return this.leagueService.joinLeague(joinLeagueInput, userId);
  }
}
