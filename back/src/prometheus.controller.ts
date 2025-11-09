import { Controller, Get, Post, Body, Res } from '@nestjs/common';
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

    // ✅ Compte le nombre total de leagues
    const leagueCount = await this.prisma.league.count();

    // ✅ Compte le nombre total de pilotteams
    const pilotteamCount = await this.prisma.pilotTeam.count();

    // ✅ Compte le nombre total de bets
    const betCount = await this.prisma.bet.count();

    // ✅ Compte le nombre total de pilots
    const pilotCount = await this.prisma.pilot.count();

    // ✅ Met à jour les métriques
    this.prometheusService.setUserCount(userCount);
    this.prometheusService.setLeagueCount(leagueCount);
    this.prometheusService.setPilotteamCount(pilotteamCount);
    this.prometheusService.setBetCount(betCount);
    this.prometheusService.setPilotCount(pilotCount);

    const metrics = await this.prometheusService.getMetrics();
    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }

  @Post('/frontend')
  async recordFrontendMetric(
    @Body() data: { pageUrl: string; loadTime: number; timestamp: number },
  ) {
    const { pageUrl, loadTime } = data;
    // Record frontend page load time as a histogram observation
    this.prometheusService.recordFrontendPageLoad(pageUrl, loadTime);
    return {
      success: true,
      message: `Frontend metric recorded for ${pageUrl}`,
    };
  }
}
