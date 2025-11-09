import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly usersGauge: client.Gauge<string>; // ✅ Changé en Gauge

  constructor() {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: 'nestjs-prometheus' });
    client.collectDefaultMetrics({ register: this.register });

    // ✅ Utilise un Gauge pour une valeur absolue
    this.usersGauge = new client.Gauge({
      name: 'users_total',
      help: 'Total number of users in database',
      registers: [this.register],
    });
  }

  // ✅ Méthode simplifiée pour définir la valeur exacte
  setUserCount(count: number): void {
    this.usersGauge.set(count);
    // console.log(`🔢 Métrique users_total définie à: ${count}`);
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
