import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrometheusService } from '../prometheus.service';

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  constructor(private prometheusService: PrometheusService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Ne pas tracker l'endpoint /metrics lui-même
    if (req.path === '/metrics') {
      return next();
    }

    const start = Date.now();
    const originalSend = res.send.bind(res);
    const prometheusService = this.prometheusService;

    res.send = function (data: any) {
      const duration = Date.now() - start;
      const route = req.route?.path || req.path || 'unknown';
      const method = req.method;
      const statusCode = res.statusCode;

      // Enregistrer les métriques
      prometheusService.recordHttpRequestDuration(
        method,
        route,
        statusCode,
        duration,
      );
      prometheusService.recordHttpError(method, route, statusCode);

      return originalSend(data);
    };

    next();
  }
}
