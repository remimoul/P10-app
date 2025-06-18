import client from 'prom-client';

const register = new client.Registry();


client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const httpErrorsTotal = new client.Counter({
  name: 'http_errors_total',
  help: 'Total des erreurs HTTP (4xx et 5xx)',
  labelNames: ['method', 'route', 'status_code'],
});

register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpErrorsTotal);

export const metrics = {
  httpRequestDurationMicroseconds,
  httpRequestsTotal,
  httpErrorsTotal,
  register,
}; 