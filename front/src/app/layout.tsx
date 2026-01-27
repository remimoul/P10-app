import "@/app/globals.css";
import "@/lib/polyfills";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ClerkProviderWrapper } from "@/components/providers/ClerkProviderWrapper";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { ApolloProviderWrapper } from "@/components/providers/ApolloProvider";
import ScrollToTop from "@/components/common/ScrollToTop";

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
            <Footer />
            <ScrollToTop />
          </ApolloProviderWrapper>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
};

export default RootLayout;
