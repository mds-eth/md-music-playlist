import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import { MenuAsideProvider } from "./contexts/MenuAsideContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MD Music Playlist",
  description: "APP for listen music anywhere...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MenuAsideProvider>
      <SpotifyProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </SpotifyProvider>
    </MenuAsideProvider>
  );
}
