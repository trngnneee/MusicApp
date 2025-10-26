"use client";

import Link from "next/link";
import { Rows3, MicVocal, Music } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { label: "Category", icon: Rows3, href: "/admin/category" },
  { label: "Singer", icon: MicVocal, href: "/admin/singer" },
  { label: "Song", icon: Music, href: "/admin/song" },
];

export const AdminSider = () => {
  const pathname = usePathname();

  return (
    <div className="w-[250px] bg-white fixed h-screen left-0 top-0 shadow-md">
      <div className="text-[20px] font-bold text-[#2B3674] text-center mt-[55px] mb-2.5 border-b border-b-[#F4F7FE] pb-[55px]">
        MusicApp <span className="font-light">Dashboard</span>
      </div>

      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 py-3 px-4 transition-all duration-300 ease-in-out group",
                active
                  ? "bg-[#F4F7FE] text-[#2B3674] font-semibold shadow-sm"
                  : "text-[#A3AED0] hover:text-[#2B3674] hover:bg-[#F9FBFF]"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active-line"
                  className="absolute right-0 top-0 h-full w-1 bg-[#2B3674] rounded-l-full"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                size={20}
                className={`transition-colors duration-300 ${active ? "text-[#2B3674]" : ""}`}
              />
              <span className="transition-all duration-300">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
