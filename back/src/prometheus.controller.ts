import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrometheusService } from './prometheus.service';
import { PrismaService } from './prisma.service'; // ✅ Injecte PrismaService directement
import { Public } from './decorators/public.decorator';

@Public()
@Controller('metrics')
export class PrometheusController {
  constructor(
    private readonly prometheusService: PrometheusService,
    private readonly prisma: PrismaService, // ✅ Plus simple
  ) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    // ✅ Compte directement les utilisateurs
    const userCount = await this.prisma.user.count();
    // console.log(`📊 Updating metrics: ${userCount} users`);

    // ✅ Met à jour la métrique
    this.prometheusService.setUserCount(userCount);

    const metrics = await this.prometheusService.getMetrics();
    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
