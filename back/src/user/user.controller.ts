import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserInput, GetUserInput } from './user.graphmodel';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user with Clerk' })
  @ApiBody({ type: CreateUserInput })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createUser(@Body() createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get user by email or clerkId' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Query('clerkId') clerkId?: string) {
    const getUserInput: GetUserInput = { clerkId };
    return this.userService.getUser(getUserInput);
  }

  @Get('count')
  async getUserCount() {
    const count = await this.userService.updateUserCount();
    return { count };
  }
}
