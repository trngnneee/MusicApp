"use client"

import { AiFillHome } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaPodcast } from "react-icons/fa";
import { MenuItem } from "../MenuItem/MenuItem";
import { userUseAuth } from "@/hooks/userUseAuth";
import { usePathname, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useWebsiteInfo } from "@/hooks/websiteInfo";
import { useEffect, useRef, useState } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { PlaylistCreateBox } from "../Playlist/PlaylistCreateBox";
import { Button } from "@/components/ui/button";

export const Sider = () => {
    const { isLogin, userInfo } = userUseAuth();
    const { websiteInfo } = useWebsiteInfo();
    const router = useRouter();
    const pathName = usePathname();

    const menu = [
        {
            icon: <AiFillHome />,
            title: "Trang Chủ",
            link: "/"
        },
        {
            icon: <FaMusic />,
            title: "Danh Mục Bài Hát",
            link: "/category"
        },
        {
            icon: <FaPodcast />,
            title: "Ca Sĩ",
            link: "/singers"
        }
    ]

    const handleLogout = () => {
        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            })

        toast.promise(promise, {
            loading: "Đang xử lý...",
            success: (data) => {
                if (data.code == "success")
                    router.push("/login");
                return data.message;
            },
            error: (data) => data.message,
        })
    }

    return (
        <>
            {websiteInfo && (
                <>
                    <Toaster />
                    <div className="bg-[#212121] h-[100vh] fixed w-[200px] sm:w-[250px] xl:w-[280px] z-[20]">
                        <div className="">
                            <div className="bg-[#1C1C1C] py-[25px] px-[10px] mb-[10px] text-[white] text-[24px] flex items-center gap-[10px] justify-center">
                                <div className="w-[50px] sm:w-[75px] lg:w-[100px] h-[50px] sm:h-[75px] lg:h-[100px] overflow-hidden rounded-[10px]">
                                    {websiteInfo?.logo ? (
                                        <img
                                            src={websiteInfo.logo}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                // e.currentTarget.src = "/fallback.png"; 
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-700 animate-pulse" />
                                    )}
                                </div>
                                <div className="font-[800]">{websiteInfo && websiteInfo.name}</div>
                            </div>
                            {isLogin && (
                                <div className="px-[15px] sm:px-[25px] lg:px-[30px] flex flex-col items-center mb-[10px] border-b-[1px] border-b-[#4d4d4d] pb-[5px]">
                                    <span className="text-white text-[10px] sm:text-[12px] italic">Welcome back!</span>
                                    <span className="text-[#fff] font-semibold text-[14px] sm:text-[16px]">{userInfo.fullName}</span>
                                </div>
                            )}
                            <nav className="">
                                <ul className="flex flex-col justify-center border-b-[1px] border-b-[#4d4d4d] w-full px-[15px] sm:px-[25px] lg:px-[30px]">
                                    {menu.map((item, index) => (
                                        <MenuItem
                                            item={item}
                                            isLogin={isLogin}
                                            key={index}
                                        />
                                    ))}

                                </ul>
                                <ul className="flex flex-col justify-center px-[15px] sm:px-[25px] mt-[15px] sm:mt-[20px]">
                                    {!isLogin && (
                                        <>
                                            <li className="mb-[10px]">
                                                <Button
                                                    variant="outline"
                                                    className={`flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0 ${pathName === "/login" ? "text-[#00ADEF]" : ""}`}
                                                    onClick={() => router.push("/login")}
                                                >
                                                    <span className="text-[12px] xl:text-[20px] mr-[15px]"><FaUser /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Đăng nhập</span>
                                                </Button>
                                            </li>
                                            <li className="mb-[10px]">
                                                <Button
                                                    variant="outline"
                                                    className={`flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0 ${pathName === "/register" ? "text-[#00ADEF]" : ""}`}
                                                    onClick={() => router.push("/register")}
                                                >
                                                    <span className="text-[12px] xl:text-[20px] mr-[15px]"><FaUserPlus /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Đăng ký</span>
                                                </Button>
                                            </li>
                                        </>
                                    )}
                                    {isLogin && (
                                        <>
                                            <li className="mb-[10px]">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => router.push("/wishlist")}
                                                    className={`flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0 ${pathName === "/wishlist" ? "text-[#00ADEF]" : ""}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><FaHeart /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Bài hát yêu thích</span>
                                                </Button>
                                            </li>
                                            <li className="mb-[10px]">
                                                <Button
                                                    onClick={() => router.push("/playlist")}
                                                    className={`flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0 ${pathName === "/playlist" ? "text-[#00ADEF]" : ""}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><BiSolidPlaylist /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Danh sách Playlist</span>
                                                </Button>
                                            </li>
                                            <li className="mb-[10px]">
                                                <PlaylistCreateBox />
                                            </li>
                                            <li className="mb-[10px]">
                                                <Button
                                                    onClick={handleLogout}
                                                    className={`flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0 ${pathName === "/login" ? "text-[#00ADEF]" : ""}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><MdLogout /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Đăng xuất</span>
                                                </Button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}