import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly usersGauge: client.Gauge<string>; // ✅ Changé en Gauge
  private readonly leaguesGauge: client.Gauge; // ✅ Gauge simple pour le total des leagues
  private readonly pilotteamsGauge: client.Gauge; // ✅ Gauge simple pour le total des pilotteams
  private readonly betsGauge: client.Gauge; // ✅ Gauge simple pour le total des bets
  private readonly pilotsGauge: client.Gauge; // ✅ Gauge simple pour le total des pilots

  // 🎯 SLO Metrics
  private readonly httpRequestDuration: client.Histogram;
  private readonly httpRequestErrorRate: client.Counter;
  private readonly graphqlRequestDuration: client.Histogram;
  private readonly graphqlErrorRate: client.Counter;
  private readonly frontendPageLoadDuration: client.Histogram;

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

    // ✅ Gauge simple pour le nombre total de pilots
    this.pilotsGauge = new client.Gauge({
      name: 'pilots_total',
      help: 'Total number of pilots',
      registers: [this.register],
    });

    // 🎯 SLO Metrics - HTTP Requests
    this.httpRequestDuration = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
      registers: [this.register],
    });

    this.httpRequestErrorRate = new client.Counter({
      name: 'http_requests_errors_total',
      help: 'Total HTTP requests errors (5xx)',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.register],
    });

    // 🎯 SLO Metrics - GraphQL Requests
    this.graphqlRequestDuration = new client.Histogram({
      name: 'graphql_request_duration_seconds',
      help: 'Duration of GraphQL requests in seconds',
      labelNames: ['operation_name', 'operation_type'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
      registers: [this.register],
    });

    this.graphqlErrorRate = new client.Counter({
      name: 'graphql_requests_errors_total',
      help: 'Total GraphQL requests errors',
      labelNames: ['operation_name', 'operation_type'],
      registers: [this.register],
    });

    // 🎯 Frontend Page Load Metrics
    this.frontendPageLoadDuration = new client.Histogram({
      name: 'frontend_page_load_duration_seconds',
      help: 'Duration of frontend page loads in seconds',
      labelNames: ['page_url'],
      buckets: [0.1, 0.5, 1, 2, 3, 5, 10],
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

  // ✅ Nouvelle méthode pour mettre à jour le nombre total de pilots
  setPilotCount(count: number): void {
    this.pilotsGauge.set(count);
    // console.log(`🔢 Métrique pilots_total définie à: ${count}`);
  }

  // 🎯 SLO Metrics Methods
  recordHttpRequestDuration(
    method: string,
    route: string,
    status_code: number,
    durationMs: number,
  ): void {
    this.httpRequestDuration
      .labels(method, route, status_code.toString())
      .observe(durationMs / 1000); // Convertir en secondes
  }

  recordHttpError(method: string, route: string, status_code: number): void {
    if (status_code >= 500) {
      this.httpRequestErrorRate
        .labels(method, route, status_code.toString())
        .inc();
    }
  }

  recordGraphqlRequestDuration(
    operation_name: string,
    operation_type: string,
    durationMs: number,
  ): void {
    this.graphqlRequestDuration
      .labels(operation_name, operation_type)
      .observe(durationMs / 1000);
  }

  recordGraphqlError(operation_name: string, operation_type: string): void {
    this.graphqlErrorRate.labels(operation_name, operation_type).inc();
  }

  // 🎯 Frontend Metrics Methods
  recordFrontendPageLoad(pageUrl: string, durationMs: number): void {
    this.frontendPageLoadDuration.labels(pageUrl).observe(durationMs / 1000); // Convertir en secondes
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
