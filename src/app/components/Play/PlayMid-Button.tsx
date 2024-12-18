"use client"

import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

export const PlayMidButton = () => {
    const handleClick = () => {
        const elementPlayAudio: any = document.querySelector(".play-audio");
        const elementPauseButton = elementPlayAudio.querySelector(".inner-button-play");
        const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
        if (elementPauseButton.classList.contains("play"))
        {
            elementPauseButton.classList.remove("play");
            elementAudio.pause();
        }
        else
        {
            elementPauseButton.classList.add("play");
            elementAudio.play();
        }
    }
    
    return (
        <>
            <div className="text-white flex justify-center gap-[52px]">
                <button>
                    <MdSkipPrevious />
                </button>
                <button 
                    className="inner-button-play play"
                    onClick={handleClick}
                >
                    <FaPlay className="inner-icon-play"/>
                    <FaPause className="inner-icon-pause"/>
                </button>
                <button>
                    <MdSkipNext />
                </button>
            </div>
        </>
    );
}