"use client"

import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { onValue, ref } from "firebase/database";

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

    const handleNext = () => {
        const elementPlayAudio: any = document.querySelector(".play-audio");
        const target = elementPlayAudio.getAttribute("id");

        const parentElement  = elementPlayAudio.querySelector(".song-item-2");
        const children = parentElement.children;
        Array.from(children).forEach((child, index) => {
            if ((child as HTMLElement).id == target)
            {   
                let nextChild = null;
                if (index + 1 >= children.length)
                {
                    nextChild = children[0];
                }
                else nextChild = children[index + 1];
                const button = nextChild.querySelector(".play-button");
                button.click();
                return;
            } 
        });
    }

    const handlePre = () => {
        const elementPlayAudio: any = document.querySelector(".play-audio");
        const target = elementPlayAudio.getAttribute("id");

        const parentElement  = elementPlayAudio.querySelector(".song-item-2");
        const children = parentElement.children;
        Array.from(children).forEach((child, index) => {
            if ((child as HTMLElement).id == target)
            {   
                let nextChild = null;
                if (index - 1 < 0)
                {
                    nextChild = children[children.length - 1];
                }
                else nextChild = children[index - 1];
                const button = nextChild.querySelector(".play-button");
                button.click();
                return;
            } 
        });
    }
    
    return (
        <>
            <div className="text-white flex justify-center gap-[52px]">
                <button onClick={handlePre}>
                    <MdSkipPrevious />
                </button>
                <button 
                    className="inner-button-play"
                    onClick={handleClick}
                >
                    <FaPause className="inner-icon-pause"/>
                    <FaPlay className="inner-icon-play"/>
                </button>
                <button onClick={handleNext}>
                    <MdSkipNext />
                </button>
            </div>
        </>
    );
}