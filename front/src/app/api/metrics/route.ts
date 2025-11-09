import { NextResponse } from 'next/server';
import { metrics } from '@/lib/prometheus-node';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const metricsData = await metrics.register.metrics();
    return new NextResponse(metricsData, {
      headers: {
        'Content-Type': metrics.register.contentType,
      },
    });
  } catch (error) {
    console.error('Error generating metrics:', error);
    return new NextResponse('Error generating metrics', { status: 500 });
  }
} 