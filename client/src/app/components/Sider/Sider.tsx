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

    const handleCreatePlaylist = () => {
        const playlistBox = document.querySelector(".playlist-box");
        if (playlistBox.classList.contains("hidden")) {
            playlistBox.classList.remove("hidden");
        }
        else {
            playlistBox.classList.add("hidden");
        }
    }

    return (
        <>
            {websiteInfo && (
                <>
                    <Toaster />
                    <div className="bg-[#212121] h-[100vh] fixed w-[200px] sm:w-[250px] xl:w-[280px] z-[99]">
                        <div className="">
                            <div className="bg-[#1C1C1C] py-[25px] px-[10px] mb-[30px] text-[white] text-[24px] flex items-center gap-[10px] justify-center">
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
                                <ul className="flex flex-col justify-center px-[15px] sm:px-[25px] mt-[15px] sm:mt-[30px]">
                                    {!isLogin && (
                                        <>
                                            <li className="mb-[15px] sm:mb-[30px]">
                                                <button
                                                    onClick={() => router.push("/login")}
                                                    className={`flex items-center hover:text-[#00ADEF] ${pathName === "/login" ? "text-[#00ADEF]" : "text-white"}`}
                                                >
                                                    <span className="text-[12px] xl:text-[20px] mr-[15px]"><FaUser /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Đăng nhập</span>
                                                </button>
                                            </li>
                                            <li className="mb-[15px] sm:mb-[30px]">
                                                <button
                                                    onClick={() => router.push("/register")}
                                                    className={`flex items-center hover:text-[#00ADEF] ${pathName === "/register" ? "text-[#00ADEF]" : "text-white"}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><FaUserPlus /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Đăng ký</span>
                                                </button>
                                            </li>
                                        </>
                                    )}
                                    {isLogin && (
                                        <>
                                            <li className="mb-[15px] sm:mb-[30px]">
                                                <button
                                                    onClick={() => router.push("/wishlist")}
                                                    className={`flex items-center hover:text-[#00ADEF] ${pathName === "/register" ? "text-[#00ADEF]" : "text-white"}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><FaHeart /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Bài hát yêu thích</span>
                                                </button>
                                            </li>
                                            <li className="mb-[15px] sm:mb-[30px]">
                                                <button
                                                    onClick={() => router.push("/playlist")}
                                                    className={`flex items-center hover:text-[#00ADEF] ${pathName === "/playlist" ? "text-[#00ADEF]" : "text-white"}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><BiSolidPlaylist /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Danh sách Playlist</span>
                                                </button>
                                            </li>
                                            <li className="mb-[15px] sm:mb-[30px]">
                                                <button
                                                    onClick={handleCreatePlaylist}
                                                    className={`flex items-center hover:text-[#00ADEF] text-white`}
                                                >
                                                    <span className="text-[12px] xl:text-[25px] mr-[15px]"><MdOutlineAddToPhotos /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Tạo Playlist</span>
                                                </button>
                                            </li>
                                            <li className="mb-[30px]">
                                                <button
                                                    onClick={handleLogout}
                                                    className={`flex items-center hover:text-[#00ADEF] ${pathName === "/register" ? "text-[#00ADEF]" : "text-white"}`}
                                                >
                                                    <span className="text-[12px] xl:text-[23px] mr-[15px]"><MdLogout /></span>
                                                    <span className="font-[700] text-[12px] xl:text-[18px]">Đăng xuất</span>
                                                </button>
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