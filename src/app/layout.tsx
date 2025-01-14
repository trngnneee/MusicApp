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
      <AOSConfig />
      <body className="bg-[#292929] relative">
        <div className="hidden sider">
          <Sider />
        </div>
        <Overlay />
        <div className="container mx-auto">
          <div className="flex item-start">
            <div className={"hidden md:block w-[280px]"}>
              <Sider />
            </div>
            <div className="w-[550px] lg:flex-1 ml-[10px] xl:ml-[20px] relative">
              <Suspense>
                <Search />
              </Suspense>
              <SearchMobile />
              <main className="mt-[20px] md:mt-[30px]">
                {children}
              </main>
              <div className="mb-[200px] sm:mb-[150px] mt-[75px] text-center mr-[30px] lg:mr-0">
                <div className="text-[15px] sm:text-[20px] md:text-[24px] text-[#727272b3] font-[500]">🎵 MusicApp - Powered by trngnneee</div>
                <div className="text-[11px] sm:text-[13px] lg:text-[15px] text-[#727272b3] flex justify-center">
                  <div>
                    <div className="flex gap-[3px]">
                      <div className="font-bold">🌐 Instagram: </div>
                      <div>@trngn.neee</div>
                    </div>
                    <div className="flex gap-[3px]">
                      <div className="font-bold">🌐 Email: </div>
                      <div>dtn06052005@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Play />
      </body>
    </html>
  );
}
