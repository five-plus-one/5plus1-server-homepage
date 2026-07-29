import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mc.five-plus-one.com"),
  title: "5plus1 Server｜把方块垒成我们共同的世界",
  description: "5plus1 Minecraft 生存服务器：服务器状态、完整入服教程、公约、皮肤站与整合包下载。",
  openGraph: {
    title: "5plus1 Server",
    description: "第 5 个世界之外，还有 1 种可能。",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
