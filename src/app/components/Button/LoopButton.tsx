"use client"

import { useState } from "react";
import { MdReplay } from "react-icons/md";
import { MdOutlineReplayCircleFilled } from "react-icons/md";

export const LoopButton = () => {
    const [active, setActive] = useState(false);
    
    const handleClick = () => {
        const loopButton = document.querySelector(".loop-button");
        if (loopButton) {
            setActive(!active);
            if (loopButton.getAttribute("id") == "")
                loopButton.setAttribute("id", "1");
            else loopButton.setAttribute("id", "");
        }
    }

    return (
        <>
            <button className="p-0 loop-button" id="" onClick={handleClick}>
                {active ? <MdOutlineReplayCircleFilled /> : <MdReplay />}
            </button>
        </>
    );
}