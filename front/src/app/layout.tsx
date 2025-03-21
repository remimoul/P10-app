import type { Metadata } from "next";
import "@/app/globals.css";


export const metadata: Metadata = {
  title: "P10 App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
