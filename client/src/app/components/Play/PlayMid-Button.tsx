"use client"

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { PreButton } from "../Button/PreButton";
import { NextButton } from "../Button/NextButton";
import { LoopButton } from "../Button/LoopButton";

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
            <div className="text-white flex justify-center items-center gap-[30px] md:gap-[52px]">
                <PreButton />
                <button
                    className="inner-button-play"
                    onClick={handleClick}
                >
                    <FaPause className="inner-icon-pause" />
                    <FaPlay className="inner-icon-play" />
                </button>
                <NextButton />
                <LoopButton />
            </div>
        </>
    );
}