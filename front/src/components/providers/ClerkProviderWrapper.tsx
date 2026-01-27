"use client";

import { ClerkProvider as ClerkProviderBase } from "@clerk/nextjs";

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ClerkProviderBase>{children}</ClerkProviderBase>;
}
