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
import { CreateLeagueInput, League, GetLeagueInput } from './league.graphmodel';
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
  @ApiBody({ type: CreateLeagueInput })
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

  @Post('with-user-db/:userId')
  @Public()
  @ApiOperation({
    summary: 'Create league with specific user ID',
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
}
