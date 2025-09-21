"use client"

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { PreButton } from "../Button/PreButton";
import { NextButton } from "../Button/NextButton";
import { LoopButton } from "../Button/LoopButton";
import { QueueButton } from "../Button/QueueButton";
import { ShuffleButton } from "../Button/ShuffleButton";

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
                <ShuffleButton/>
                <PreButton />
                <button
                    className="inner-button-play"
                    onClick={handleClick}
                >
                    <FaPause className="inner-icon-pause text-[20px]" />
                    <FaPlay className="inner-icon-play text-[20px]" />
                </button>
                <NextButton />
                <LoopButton />
                <QueueButton/>
            </div>
        </>
    );
}