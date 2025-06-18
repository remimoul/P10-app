import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/results(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/faq(.*)",
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    const authResult = auth.protect();
    if (authResult instanceof Promise) {
      return authResult.then(() => NextResponse.next());
    }
    return NextResponse.next();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api/metrics|_next/static|_next/image|favicon.ico).*)',
  ],
};
