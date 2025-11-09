import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { PilotService } from './pilot.service';
import { CreatePilotInput, Pilot } from './pilot.graphmodel';
import { Public } from '../decorators/public.decorator';

@ApiTags('Pilots')
@Controller('pilots')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pilot' })
  @ApiBody({ type: CreatePilotInput })
  @ApiResponse({ status: 201, description: 'Pilot successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createPilot(@Body() createPilotInput: CreatePilotInput) {
    return this.pilotService.createPilot(createPilotInput);
  }

  @Public()
  @Get('all')
  @ApiOperation({ summary: 'Get all pilots' })
  @ApiResponse({ status: 200, description: 'List of all pilots' })
  async getAllPilots() {
    return this.pilotService.getAllPilots();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get pilot by ID' })
  @ApiResponse({ status: 200, description: 'Pilot found' })
  @ApiResponse({ status: 404, description: 'Pilot not found' })
  async getPilotById(@Param('id') id: string) {
    return this.pilotService.getPilotById(id);
  }
}
