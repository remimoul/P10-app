import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {
  League,
  CreateLeagueInput,
  GetLeagueInput,
  DeleteLeagueInput,
  UpdateLeagueInput,
  DeleteLeagueResponse,
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
  @Query(() => League)
  async getLeague(
    @Args('input') getLeagueInput: GetLeagueInput,
  ): Promise<League> {
    return this.leagueService.getLeague(getLeagueInput);
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

  @Public()
  @Mutation(() => DeleteLeagueResponse)
  async deleteLeague(
    @Args('leagueId', { type: () => String }) leagueId: string,
    @Context() context: any,
  ): Promise<{ success: boolean; message: string }> {
    // Get the authenticated user from context
    const clerkId = context.req.user?.clerkId || context.req.auth?.userId;

    if (!clerkId) {
      throw new Error('User authentication required to delete a league');
    }

    // Find the user's database ID using the clerkId
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new Error('User not found in the database');
    }

    // Delete the league
    return this.leagueService.deleteLeague(leagueId, user.id);
  }

  @Public()
  @Mutation(() => DeleteLeagueResponse)
  async deleteLeagueWithUserId(
    @Args('leagueId', { type: () => String }) leagueId: string,
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<{ success: boolean; message: string }> {
    // Find the user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Delete the league
    return this.leagueService.deleteLeague(leagueId, userId);
  }
}
