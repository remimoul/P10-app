import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly usersGauge: client.Gauge<string>; // ✅ Changé en Gauge
  private readonly leaguesGauge: client.Gauge; // ✅ Gauge simple pour le total des leagues
  private readonly pilotteamsGauge: client.Gauge; // ✅ Gauge simple pour le total des pilotteams
  private readonly betsGauge: client.Gauge; // ✅ Gauge simple pour le total des bets

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

    // ✅ Gauge simple pour le nombre total de leagues
    this.leaguesGauge = new client.Gauge({
      name: 'leagues_total',
      help: 'Total number of leagues',
      registers: [this.register],
    });

    // ✅ Gauge simple pour le nombre total de pilotteams
    this.pilotteamsGauge = new client.Gauge({
      name: 'pilotteams_total',
      help: 'Total number of pilot teams',
      registers: [this.register],
    });

    // ✅ Gauge simple pour le nombre total de bets
    this.betsGauge = new client.Gauge({
      name: 'bets_total',
      help: 'Total number of bets',
      registers: [this.register],
    });
  }

  // ✅ Méthode simplifiée pour définir la valeur exacte
  setUserCount(count: number): void {
    this.usersGauge.set(count);
    // console.log(`🔢 Métrique users_total définie à: ${count}`);
  }

  // ✅ Nouvelle méthode pour mettre à jour le nombre total de leagues
  setLeagueCount(count: number): void {
    this.leaguesGauge.set(count);
    // console.log(`🔢 Métrique leagues_total définie à: ${count}`);
  }

  // ✅ Nouvelle méthode pour mettre à jour le nombre total de pilotteams
  setPilotteamCount(count: number): void {
    this.pilotteamsGauge.set(count);
    // console.log(`🔢 Métrique pilotteams_total définie à: ${count}`);
  }

  // ✅ Nouvelle méthode pour mettre à jour le nombre total de bets
  setBetCount(count: number): void {
    this.betsGauge.set(count);
    // console.log(`🔢 Métrique bets_total définie à: ${count}`);
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
