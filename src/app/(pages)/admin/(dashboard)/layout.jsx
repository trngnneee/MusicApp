"use client"

import { AdminSider } from "./components/sider";
import { AdminAuthProvider } from "@/context/adminAuthProvider";
import { AdminHeader } from "./components/adminHeader/header";

export default function DashboardLayout({ children }) {
  return (
    <AdminAuthProvider>
      <div className="relative">
        <AdminSider />
        <div className="w-[calc(100% - 250px)] h-screen bg-[#F4F7FE] ml-[250px] p-[30px]">
          <AdminHeader />
          <div className="mt-[50px]">
            {children}
          </div>
        </div>
      </div>
    </AdminAuthProvider>
  );
}