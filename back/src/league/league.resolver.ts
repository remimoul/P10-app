import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { LeagueService } from './league.service';
import {
  League,
  CreateLeagueInput,
  GetLeagueInput,
  DeleteLeagueInput,
  UpdateLeagueInput,
  DeleteLeagueResponse,
  JoinLeagueInput,
  GetLeaguesPaginatedInput,
  LeaguesResult,
} from './league.graphmodel';

import { Public } from 'src/decorators/public.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import type { DbUser } from 'src/auth/load-db-user.guard';
import { PrismaService } from 'src/prisma.service';

@Resolver(() => League)
export class LeagueResolver {
  constructor(
    private leagueService: LeagueService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Mutation(() => League)
  async createLeague(
    @Args('createLeagueInput') createLeagueInput: CreateLeagueInput,
    @CurrentUser() user: DbUser | undefined,
  ): Promise<League> {
    if (!user) {
      throw new UnauthorizedException('User authentication required to create a league');
    }
    return this.leagueService.createLeague(createLeagueInput, user.id);
  }

  // Méthode de développement pour créer une ligue avec un ID utilisateur spécifique
  @Public()
  @Mutation(() => League)
  async createLeagueWithUserId(
    @Args('createLeagueInput') createLeagueInput: CreateLeagueInput,
    @Args('userId', { type: () => String }) clerkId: string, // Renommé pour plus de clarté
  ): Promise<League> {
    // Vérifier si l'utilisateur existe par clerkId au lieu de id
    const user = await this.prisma.user.findUnique({
      where: { clerkId: clerkId }, // Utiliser clerkId au lieu de id
    });

    if (!user) {
      throw new Error(`Utilisateur avec clerkId ${clerkId} non trouvé`);
    }

    // Créer la ligue avec l'ID utilisateur de la base de données
    return this.leagueService.createLeague(createLeagueInput, user.id);
  }

  @Public()
  @Query(() => [League])
  async getAllLeagues(): Promise<League[]> {
    return this.leagueService.getAllLeagues();
  }

  @Public()
  @Query(() => LeaguesResult)
  async getLeaguesPaginated(
    @Args('input', { nullable: true }) input?: GetLeaguesPaginatedInput,
  ): Promise<LeaguesResult> {
    const limit = input?.limit ?? 20;
    const offset = input?.offset ?? 0;
    return this.leagueService.getLeaguesPaginated(limit, offset);
  }

  @Public()
  @Query(() => League)
  async getLeague(
    @Args('input') getLeagueInput: GetLeagueInput,
  ): Promise<League> {
    return this.leagueService.getLeague(getLeagueInput);
  }

  @UseGuards(ClerkAuthGuard)
  @Mutation(() => League)
  async joinLeague(
    @Args('joinLeague') joinLeagueInput: JoinLeagueInput,
    @CurrentUser() user: DbUser | undefined,
  ): Promise<League> {
    if (!user) {
      throw new UnauthorizedException('User authentication required to join a league');
    }
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

  @UseGuards(ClerkAuthGuard)
  @Mutation(() => DeleteLeagueResponse)
  async deleteLeague(
    @Args('leagueId', { type: () => String }) leagueId: string,
    @CurrentUser() user: DbUser | undefined,
  ): Promise<{ success: boolean; message: string }> {
    if (!user) {
      throw new UnauthorizedException('User authentication required to delete a league');
    }
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
