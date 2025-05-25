import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Request,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LeagueService } from './league.service';
import {
  CreateLeagueInput,
  League,
  GetLeagueInput,
  JoinLeagueInput,
} from './league.graphmodel';
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
import { PrismaService } from 'src/prisma.service';

@ApiTags('Leagues')
@Controller('leagues')
export class LeagueController {
  constructor(
    private readonly leagueService: LeagueService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @Public()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new league only for authenticated users with Clerk',
    description: 'Creates a new league with the authenticated user as admin',
  })
  @ApiBody({
    type: CreateLeagueInput,
    examples: {
      publicLeague: {
        summary: 'Public League',
        description: 'Example for creating a public league',
        value: {
          name: 'My Public League',
          private: false,
        },
      },
      privateLeague: {
        summary: 'Private League',
        description: 'Example for creating a private league',
        value: {
          name: 'My Private League',
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
  @ApiResponse({ status: 401, description: 'User authentication required' })
  @ApiResponse({ status: 404, description: 'User not found in database' })
  async createLeague(
    @Body() createLeagueInput: CreateLeagueInput,
    @Request() req,
  ) {
    // Extract user ID from request
    const clerkId = req.user?.clerkId || req.auth?.userId;

    if (!clerkId) {
      throw new UnauthorizedException(
        'User authentication required to create a league',
      );
    }

    // Find user in database
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new NotFoundException('User not found in the database');
    }

    // Create league using service
    return this.leagueService.createLeague(createLeagueInput, user.id);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Get all leagues',
    description: 'Retrieves a list of all available leagues',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all leagues',
    type: [League],
  })
  async getAllLeagues() {
    return this.leagueService.getAllLeagues();
  }

  @Post('join')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Join a league using its ID',
    description:
      'Allows an authenticated user to join a league by its ID. A join code is required only if the league is private.',
  })
  @ApiBody({
    type: JoinLeagueInput,
    examples: {
      example: {
        value: {
          leagueId: '123e4567-e89b-12d3-a456-426614174000',
          joinCode: 'Non obligatoire pour les leagues publiques', // Optionnel pour les leagues publiques
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
  @ApiResponse({ status: 401, description: 'User authentication required' })
  @ApiResponse({ status: 404, description: 'League not found' })
  async joinLeague(@Body() joinLeagueInput: JoinLeagueInput, @Request() req) {
    // Extract user ID from request
    const clerkId = req.user?.clerkId || req.auth?.userId;

    if (!clerkId) {
      throw new UnauthorizedException(
        'User authentication required to join a league',
      );
    }

    // Find user in database
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new NotFoundException(
        'User not found in database. Please complete your profile first.',
      );
    }

    // Join league using service
    return this.leagueService.joinLeague(joinLeagueInput, user.id);
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
}
