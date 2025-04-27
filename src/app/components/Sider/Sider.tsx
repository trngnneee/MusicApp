"use client"

import { AiFillHome } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaPodcast } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { authFireBase } from "@/app/FirebaseConfig";
import { useEffect, useState } from "react";
import { MenuItem } from "../MenuItem/MenuItem";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";

export const Sider = () => {
    const [isLogin, setIsLogin] = useState<boolean>();

    useEffect(() => {
        onAuthStateChanged(authFireBase, (user) => {
            if (user) {
                setIsLogin(true);
            }
            else {
                setIsLogin(false);
            }
        });
    }, [])

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
        },
        {
            icon: <FaHeart />,
            title: "Bài Hát Ưu Thích",
            link: "/wishlist",
            isLogin: true
        },
        {
            icon: <MdLibraryMusic />,
            title: "Danh Sách Phát",
            link: "/playlist",
            isLogin: true
        },
        {
            icon: <MdLogout />,
            title: "Đăng Xuất",
            link: "/logout",
            isLogin: true
        },
        {
            icon: <FaUser />,
            title: "Đăng Nhập",
            link: "/login",
            isLogin: false
        },
        {
            icon: <FaUserPlus />,
            title: "Đăng Ký",
            link: "/register",
            isLogin: false
        },
    ]
    return (
        <>
            <div className="bg-[#212121] h-[100vh] fixed w-[200px] lg:w-[250px] xl:w-[280px] z-[999]">
                <div className="">
                    <div className="bg-[#1C1C1C] py-[25px] px-[10px] mb-[30px] text-[white] text-[24px] xl:text-[36px] flex items-center gap-[30px]">
                        <BsFillMusicPlayerFill />
                        <div className="font-[800]">Music App</div>
                    </div>
                    <nav className="px-[20px]">
                        <ul className="">
                            {menu.map((item, index) => (
                               <MenuItem
                                item={item}
                                isLogin={isLogin}
                                key={index}
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}