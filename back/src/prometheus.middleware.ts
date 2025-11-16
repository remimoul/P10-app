import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrometheusService } from './prometheus.service';

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  constructor(private readonly prometheusService: PrometheusService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const diffSeconds = Number(end - start) / 1e9;

      const route =
        (req as any).route?.path || req.path || req.originalUrl || 'unknown';

      const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
      };

      this.prometheusService.httpRequestsTotal.inc(labels);
      this.prometheusService.httpRequestDurationSeconds.observe(
        labels,
        diffSeconds,
      );
    });

    next();
  }
}
