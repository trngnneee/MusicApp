"use client"

import { HiOutlineViewList } from "react-icons/hi";

export const MenuListButton = () => {
    const handleClick = () => {
        const siderElement = document.querySelector(".sider");
        const overlayElement = document.querySelector(".overlay");
        siderElement.classList.toggle("active");
        overlayElement.classList.toggle("active");
    }
    
    return (
        <>
            <button onClick={handleClick}>
                <HiOutlineViewList />
            </button>
        </>
    );
}