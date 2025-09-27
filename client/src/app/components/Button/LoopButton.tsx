"use client"

import { useState } from "react";
import { MdReplay } from "react-icons/md";
import { MdOutlineReplayCircleFilled } from "react-icons/md";

export const LoopButton = () => {
    const [active, setActive] = useState(false);
    
    const handleClick = () => {
        setActive(!active);
    }

    return (
        <>
            <button className={`text-[24px] hidden sm:block p-0 loop-button ${active ? "text-[#00ADEF]" : "text-white"}`} onClick={handleClick} data-loop-active={active}>
                <MdReplay />
            </button>
        </>
    );
}