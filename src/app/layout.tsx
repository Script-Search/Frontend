import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../utils/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScriptSearch - YouTube Transcript Search",
  description: "A tool to search transcripts of YouTube videos for a desired keyword or phrase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
