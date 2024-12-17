import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Orbitum",
  description: " A Global State Framework for Cross-Chain Smart Contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
