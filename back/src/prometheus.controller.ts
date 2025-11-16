import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrometheusService } from './prometheus.service';
import { PrismaService } from './prisma.service';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('metrics')
export class PrometheusController {
  constructor(
    private readonly prometheusService: PrometheusService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    const userCount = await this.prisma.user.count();
    // console.log(`updating metrics: ${userCount} users`);

    this.prometheusService.setUserCount(userCount);

    const metrics = await this.prometheusService.getMetrics();
    res.setHeader('Content-Type', this.prometheusService.contentType);
    res.send(metrics);
  }
}
