"use client"

import { FaSearch } from "react-icons/fa";

export const SearchButton = () => {
    const handleClick = () => {
        const searchElement = document.querySelector(".search-box");
        searchElement.classList.toggle("active");
    }
    
    return (
        <>
            <button onClick={handleClick}>
                <FaSearch />
            </button>
        </>
    );
}