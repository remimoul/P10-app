import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly usersCounter: client.Counter<string>; // ✅ Ajoute le counter

  constructor() {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: 'nestjs-prometheus' });
    client.collectDefaultMetrics({ register: this.register });

    // ✅ Crée le counter pour les utilisateurs
    this.usersCounter = new client.Counter({
      name: 'users_total',
      help: 'Total number of users in database',
      registers: [this.register], // ✅ Utilise le même registre
    });
  }

  // ✅ Méthode pour incrémenter le compteur
  incrementUserCount(count: number = 1): void {
    this.usersCounter.inc(count);
  }

  // ✅ Méthode pour reset et définir la valeur
  resetAndSetUserCount(count: number): void {
    this.usersCounter.reset();
    if (count > 0) {
      this.usersCounter.inc(count);
    }
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
