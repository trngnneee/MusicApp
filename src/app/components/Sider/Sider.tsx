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
import path from "path";

export const Sider = () => {
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
            link: "/logout"
        },
        {
            icon: <FaUser />,
            title: "Đăng nhập",
            link: "/login"
        },
        {
            icon: <FaUserPlus />,
            title: "Đăng ký",
            link: "/register"
        },
    ]
    const pathname = usePathname();
    console.log(pathname);
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
                                <li className="mb-[30px]" key={index}>
                                    <Link
                                        href={item.link}
                                        className={`flex items-center hover:text-[#00ADEF] ${pathname === item.link ? "text-[#00ADEF]" : "text-white"
                                            }`}
                                    >
                                        <span className="text-[16px] mr-[20px]">{item.icon}</span>
                                        <span className="font-[700] text-[16px]">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}