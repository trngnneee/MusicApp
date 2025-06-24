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
            <button className="p-0 loop-button" onClick={handleClick} data-loop-active={active}>
                {active ? <MdOutlineReplayCircleFilled /> : <MdReplay />}
            </button>
        </>
    );
}