import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/results(.*)", "/sign-in(.*)", "/sign-up(.*)", "/faq(.*)"]);

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

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
