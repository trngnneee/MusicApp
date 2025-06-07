import type { Metadata } from "next";
import "./globals.css";
import { AOSConfig } from "./AOSConfig";
import { MainLayout } from "./components/MainLayout/MainLayout";

export const metadata: Metadata = {
  title: "MusicApp",
  description: "Nghe nhạc trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi">
      <AOSConfig />
      <MainLayout>
        {children}
      </MainLayout>
    </html>
  );
}
