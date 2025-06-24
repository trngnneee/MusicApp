"use client"

import { usePathname } from "next/navigation";
import { AdminSider } from "../Admin/Sider/Sider";
import { Sider } from "../Sider/Sider"
import { Overlay } from "../Overlay/Overlay";
import { Suspense } from "react";
import { Search } from "../Search/Search";
import { SearchMobile } from "../Search/SearchMobile";
import { Play } from "../Play/Play";
import { Header } from "../Admin/Header/Header";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith("/admin");
  const isAdminAccount = pathName.startsWith("/admin/account");

  if (isAdmin) {
    if (isAdminAccount) {
      return (
        <>
          <>
            <body className="admin">
              {children}
            </body>
          </>
        </>
      );
    }
    else {
      return (
        <>
          <body className="admin bg-[#F5F6FA] relative min-h-screen">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50">
              <Header />
            </div>

            {/* Layout wrapper */}
            <div className="flex">
              {/* Fixed Sidebar */}
              <div className="hidden xl:block fixed top-[var(--header-height)] left-0 h-[calc(100vh-var(--header-height))] w-[250px]">
                <AdminSider />
              </div>

              {/* Main content */}
              <main className="flex-1 xl:ml-[250px] p-[30px] overflow-y-auto">
                {children}
              </main>
            </div>
          </body>
        </>
      );
    }
  }
  else {
    return (
      <>
        <body className="bg-[#292929] relative client">
          <div className="hidden sider">
            <Sider />
          </div>
          <Overlay />
          <div className="container mx-auto mb-[100px]">
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
              </div>
            </div>
          </div>
          <Play />
        </body>
      </>
    );
  }
}