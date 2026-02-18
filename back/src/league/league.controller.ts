import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UnauthorizedException,
  NotFoundException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LeagueService } from './league.service';
import {
  CreateLeagueInput,
  League,
  GetLeagueInput,
  JoinLeagueInput,
} from './league.graphmodel';
import { CreateLeagueDto } from './dto/create-league.dto';
import { JoinLeagueDto } from './dto/join-league.dto';
import { LeaguesQueryDto } from './dto/leagues-query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import type { DbUser } from 'src/auth/load-db-user.guard';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { PrismaService } from 'src/prisma.service';

@ApiTags('Leagues')
@Controller('leagues')
export class LeagueController {
  constructor(
    private readonly leagueService: LeagueService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @UseGuards(ClerkAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new league only for authenticated users with Clerk',
    description: 'Creates a new league with the authenticated user as admin',
  })
  @ApiBody({ type: CreateLeagueDto })
  @ApiResponse({
    status: 201,
    description: 'League successfully created',
    type: League,
  })
  @ApiResponse({ status: 401, description: 'User authentication required' })
  @ApiResponse({ status: 404, description: 'User not found in database' })
  async createLeague(
    @Body() dto: CreateLeagueDto,
    @CurrentUser() user: DbUser | undefined,
  ) {
    if (!user) {
      throw new UnauthorizedException('User authentication required to create a league');
    }
    return this.leagueService.createLeague(
      { name: dto.name, private: dto.private },
      user.id,
    );
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Get leagues (paginated)',
    description: 'Returns leagues and total count. Same shape with or without query params.',
  })
  @ApiResponse({
    status: 200,
    description: 'Leagues and total count',
    schema: {
      type: 'object',
      properties: {
        leagues: { type: 'array', items: { $ref: '#/components/schemas/League' } },
        total: { type: 'number' },
      },
    },
  })
  async getAllLeagues(@Query() query: LeaguesQueryDto) {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;
    return this.leagueService.getLeaguesPaginated(limit, offset);
  }

  @Post('join')
  @UseGuards(ClerkAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Join a league using its ID',
    description:
      'Allows an authenticated user to join a league by its ID. A join code is required only if the league is private.',
  })
  @ApiBody({ type: JoinLeagueDto })
  @ApiResponse({
    status: 201,
    description: 'Successfully joined the league',
    type: League,
  })
  @ApiResponse({
    status: 400,
    description: 'Already a member or invalid join code',
  })
  @ApiResponse({ status: 401, description: 'User authentication required' })
  @ApiResponse({ status: 404, description: 'League not found' })
  async joinLeague(
    @Body() dto: JoinLeagueDto,
    @CurrentUser() user: DbUser | undefined,
  ) {
    if (!user) {
      throw new UnauthorizedException(
        'User authentication required to join a league',
      );
    }
    return this.leagueService.joinLeague(
      { leagueId: dto.leagueId, joinCode: dto.joinCode },
      user.id,
    );
  }

  @Post('join-with-user-db/:userId')
  @Public()
  @ApiOperation({
    summary: 'Join a league with specific user ID (development only)',
    description:
      'Development endpoint to join a league with a specific user without authentication',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user in the database',
  })
  @ApiBody({
    type: JoinLeagueInput,
    examples: {
      example: {
        value: {
          leagueId: '123e4567-e89b-12d3-a456-426614174000',
          joinCode: 'CODE123', // Optionnel pour les leagues publiques
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully joined the league',
    type: League,
  })
  @ApiResponse({
    status: 400,
    description: 'Already a member or invalid join code',
  })
  @ApiResponse({ status: 404, description: 'User or league not found' })
  async joinLeagueWithUserId(
    @Param('userId') userId: string,
    @Body() joinLeagueInput: JoinLeagueInput,
  ) {
    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Rejoindre la league avec l'ID utilisateur fourni
    return this.leagueService.joinLeague(joinLeagueInput, userId);
  }

  @Post('with-user-db/:userId')
  @Public()
  @ApiOperation({
    summary: 'Create league with specific user ID (development only)',
    description:
      'Development endpoint to create a league with a specific user as admin',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user in the database',
  })
  @ApiBody({
    type: CreateLeagueInput,
    examples: {
      example: {
        value: {
          name: 'League Pokémon',
          private: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'League successfully created',
    type: League,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async createLeagueWithUserId(
    @Param('userId') userId: string,
    @Body() createLeagueInput: CreateLeagueInput,
  ) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Create league with the provided user ID
    return this.leagueService.createLeague(createLeagueInput, userId);
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Get league by ID',
    description: 'Retrieves a specific league by its ID',
  })
  @ApiParam({ name: 'id', description: 'League ID' })
  @ApiResponse({ status: 200, description: 'League found', type: League })
  @ApiResponse({ status: 404, description: 'League not found' })
  async getLeagueById(@Param('id') id: string) {
    return this.leagueService.getLeague({ id });
  }

  @Get('by-name/:name')
  @Public()
  @ApiOperation({
    summary: 'Get league by name',
    description: 'Retrieves a league by its name',
  })
  @ApiParam({ name: 'name', description: 'League name' })
  @ApiResponse({ status: 200, description: 'League found', type: League })
  @ApiResponse({ status: 404, description: 'League not found' })
  async getLeagueByName(@Param('name') name: string) {
    return this.leagueService.getLeague({ name });
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a league',
    description:
      'Deletes a league. Only the admin of the league can delete it.',
  })
  @ApiParam({ name: 'id', description: 'League ID' })
  @ApiResponse({
    status: 200,
    description: 'League successfully deleted',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'League "My League" successfully deleted',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Only the league admin can delete the league',
  })
  @ApiResponse({ status: 401, description: 'User authentication required' })
  @ApiResponse({ status: 404, description: 'League not found' })
  async deleteLeague(
    @Param('id') leagueId: string,
    @CurrentUser() user: DbUser | undefined,
  ) {
    if (!user) {
      throw new UnauthorizedException(
        'User authentication required to delete a league',
      );
    }
    return this.leagueService.deleteLeague(leagueId, user.id);
  }

  @Delete('with-user-db/:leagueId/:userId')
  @Public()
  @ApiOperation({
    summary: 'Delete league with specific user ID (development only)',
    description:
      'Development endpoint to delete a league with a specific user without authentication',
  })
  @ApiParam({
    name: 'leagueId',
    type: String,
    description: 'ID of the league to delete',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user in the database (should be admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'League successfully deleted',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'League "My League" successfully deleted',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Only the league admin can delete the league',
  })
  @ApiResponse({ status: 404, description: 'User or league not found' })
  async deleteLeagueWithUserId(
    @Param('leagueId') leagueId: string,
    @Param('userId') userId: string,
  ) {
    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Supprimer la league
    return this.leagueService.deleteLeague(leagueId, userId);
  }
}
