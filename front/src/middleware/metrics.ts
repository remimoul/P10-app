import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { metrics } from '@/lib/prometheus';

export async function metricsMiddleware(request: NextRequest) {
  const start = Date.now();
  const response = NextResponse.next();

  const duration = (Date.now() - start) / 1000;
  const route = request.nextUrl.pathname;
  const method = request.method;
  const statusCode = response.status;

  metrics.httpRequestDurationMicroseconds.observe(
    { method, route, status_code: statusCode },
    duration
  );

  metrics.httpRequestsTotal.inc({ method, route, status_code: statusCode });

  return response;
} 