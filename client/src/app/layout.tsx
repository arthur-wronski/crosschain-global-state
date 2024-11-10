import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Nexus",
  description: " A Global State Framework for Cross-Chain Smart Contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={orbitron.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
