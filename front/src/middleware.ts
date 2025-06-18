import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { metrics } from "@/lib/prometheus";

const isPublicRoute = createRouteMatcher([
  "/",
  "/results(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/faq(.*)",
]);

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  },
  {
    authorizedParties: [
      "http://localhost:3000", // Frontend local
      "http://localhost:4500", // Backend local
      "https://www.grineasy.com",
      "https://grineasy.online",
    ],
  }
);

export async function middleware(request: NextRequest) {
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

  if (statusCode >= 400) {
    metrics.httpErrorsTotal.inc({ method, route, status_code: statusCode });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api/metrics|_next/static|_next/image|favicon.ico).*)",
  ],
};
