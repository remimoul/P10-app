import { Counter, Histogram } from "prom-client";

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

export const httpRequestDurationMicroseconds = new Histogram({
  name: "http_request_duration_microseconds",
  help: "Duration of HTTP requests in microseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const metrics = {
  httpRequestsTotal,
  httpRequestDurationMicroseconds,
};
