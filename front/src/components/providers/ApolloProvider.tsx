"use client";

import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo-client";
import type { ApolloClient as ApolloClientType } from "@apollo/client";

export function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<ApolloClientType<unknown> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setClient(getApolloClient());
    } catch (error) {
      console.error("Error creating Apollo Client:", error);
    }
  }, []);

  if (!mounted || !client) {
    return <>{children}</>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
