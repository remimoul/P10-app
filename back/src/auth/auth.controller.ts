import { User } from '@clerk/backend';
import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  @Get('me')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
