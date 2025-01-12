import type { Metadata } from "next";
import "./globals.css";
import { Sider } from "./components/Sider/Sider";
import { Search } from "./components/Search/Search";
import { Play } from "./components/Play/Play";
import { Suspense } from "react";
import { AOSConfig } from "./AOSConfig";
import { SearchMobile } from "./components/Search/SearchMobile";
import { Overlay } from "./components/Overlay/Overlay";

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
      <AOSConfig/>
      <body className="bg-[#292929] relative">
        <div className="hidden sider">
          <Sider/>
        </div>
        <Overlay/>
        <div className="container mx-auto">
          <div className="flex item-start">
            <div className={"hidden md:block w-[280px]"}>
              <Sider/>
            </div>
            <div className="w-[550px] lg:flex-1 ml-[10px] xl:ml-[20px] relative">
              <Suspense>
                <Search/>
              </Suspense>
              <SearchMobile/>
              <main className="mt-[20px] md:mt-[30px] mb-[200px] sm:mb-[150px]">
                {children}
              </main>
            </div>
          </div>
        </div>
        <Play/>
      </body>
    </html>
  );
}
