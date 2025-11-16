import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;

  private readonly usersGauge: client.Gauge<string>;

  public readonly httpRequestDurationSeconds: client.Histogram<string>;
  public readonly httpRequestsTotal: client.Counter<string>;

  constructor() {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: 'nestjs-prometheus' });

    client.collectDefaultMetrics({ register: this.register });

    this.usersGauge = new client.Gauge({
      name: 'users_total',
      help: 'Total number of users in database',
      registers: [this.register],
    });

    this.httpRequestDurationSeconds = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.05, 0.1, 0.2, 0.3, 0.5, 1, 2, 5],
      registers: [this.register],
    });

    this.httpRequestsTotal = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.register],
    });
  }

  setUserCount(count: number): void {
    this.usersGauge.set(count);
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }

  get contentType(): string {
    return this.register.contentType;
  }
}
