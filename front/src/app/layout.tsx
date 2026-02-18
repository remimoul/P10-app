import "@/app/globals.css";
import "@/lib/polyfills";
import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { ClerkProviderWrapper } from "@/components/providers/ClerkProviderWrapper";
import Navbar from "@/components/layouts/Navbar";
import { ApolloProviderWrapper } from "@/components/providers/ApolloProvider";

const Footer = dynamic(
  () => import("@/components/layouts/Footer").then((m) => m.default),
  {
    loading: () => (
      <footer className="h-32 bg-gray-900 animate-pulse" aria-hidden="true" />
    ),
  }
);

const ScrollToTop = dynamic(
  () => import("@/components/common/ScrollToTop").then((m) => m.default),
  { loading: () => null }
);

export const metadata: Metadata = {
  title: "P10 App",
  description: "",
  icons: {
    icon: "/logo.ico",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProviderWrapper>
      <html lang="en" className="font-formula1 h-full">
        <body className="flex flex-col min-h-screen">
          <ApolloProviderWrapper>
            <Navbar />
            <main>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  className: "bg-white text-gray-800 font-bold shadow-lg rounded-lg p-4 border-l-8 border-red-600",
                  duration: 4000,
                }}
              />
            </main>
            <Suspense fallback={<footer className="h-32 bg-gray-900" aria-hidden="true" />}>
              <Footer />
            </Suspense>
            <ScrollToTop />
          </ApolloProviderWrapper>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
};

export default RootLayout;
