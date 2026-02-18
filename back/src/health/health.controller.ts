import {
  Controller,
  Get,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Public } from '../decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @Public()
  async check() {
    return { status: 'ok' };
  }

  @Get('ready')
  @Public()
  async ready() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'connected' };
    } catch (error: any) {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'disconnected',
        message: error?.message ?? 'Database check failed',
      });
    }
  }
}
