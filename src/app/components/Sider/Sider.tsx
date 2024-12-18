"use client"

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaPodcast } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { authFireBase } from "@/app/FirebaseConfig";
import { useEffect, useState } from "react";
import { MenuItem } from "../MenuItem/MenuItem";

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
            title: "Trang chủ",
            link: "/"
        },
        {
            icon: <FaMusic />,
            title: "Danh mục bài hát",
            link: "/category"
        },
        {
            icon: <FaPodcast />,
            title: "Ca sĩ",
            link: "/singers"
        },
        {
            icon: <FaHeart />,
            title: "Bài hát ưu thích",
            link: "/wishlist"
        },
        {
            icon: <MdLogout />,
            title: "Đăng xuất",
            link: "/logout",
            isLogin: true
        },
        {
            icon: <FaUser />,
            title: "Đăng nhập",
            link: "/login",
            isLogin: false
        },
        {
            icon: <FaUserPlus />,
            title: "Đăng ký",
            link: "/register",
            isLogin: false
        },
    ]
    return (
        <>
            <div className="bg-[#212121] h-[100vh] fixed w-[280px]">
                <div className="">
                    <div className="bg-[#1C1C1C] py-[25px] pl-[20px] mb-[30px]">
                        <img
                            src="/Logo.png"
                            alt="Logo"
                            className="h-[42px] w-auto"
                        />
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