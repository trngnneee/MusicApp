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
        if (elementAudio.paused) {
            elementAudio.play();
            elementPauseButton.classList.add("play");  
        } else {
            elementAudio.pause();
            elementPauseButton.classList.remove("play");  
        }
    }
    
    return (
        <>
            <div className="text-white flex justify-center gap-[52px]">
                <button>
                    <MdSkipPrevious />
                </button>
                <button 
                    className="inner-button-play"
                    onClick={handleClick}
                >
                    <FaPause className="inner-icon-pause"/>
                    <FaPlay className="inner-icon-play"/>
                </button>
                <button>
                    <MdSkipNext />
                </button>
            </div>
        </>
    );
}