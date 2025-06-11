"use client"

import { useState } from "react";
import { BsMusicPlayer } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { AdminSider } from "../Sider/Sider";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <AdminSider className={"xl:hidden fixed top-0 left-0 z-[999] " + (open ? "block" : "hidden")} />
          <div className={"bg-[#0000004a] w-full h-full fixed top-0 left-0 z-[100] cursor-pointer " + (open ? "block" : "hidden")} onClick={() => { setOpen(false) }}></div>
          <div className="border-b-[1px] border-b-[#E0E0E0] py-[22px] bg-white shadow">
            <div className="mx-[30px] flex justify-between items-center px-[10px] sm:px-0">
              <div className="block xl:hidden text-[18px] sm:text-[24px] cursor-pointer" onClick={() => { setOpen(true) }}><FaListUl /></div>
              <div className="flex items-center gap-[10px]">
                <BsMusicPlayer className="text-[30px]" />
                <div className="font-[800] text-[20px] sm:text-[24px]">MusicApp</div>
                <span className="font-[800] text-[20px] sm:text-[24px] text-[#4880FF]">Admin</span>
              </div>
              <div className="hidden sm:flex items-center gap-[10px]">
                <div className="rounded-[50%] overflow-hidden">
                  <img src="/adminAvatar.png" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <div className="font-[700] text-[14px] text-dark">{userInfo.fullName}</div>
                  <div className="font-[600] text-[12px] text-dark">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}