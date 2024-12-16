"use client"

import { FaPlay } from "react-icons/fa";
export const PlayButton = (props: any) => {
    const {item} = props;
    
    const handlePlay = () => {
        const audio = item.audio;

        // Play Music
        const elementPlayAudio: any = document.querySelector(".play-audio");
        const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
        const elementSource = elementAudio?.querySelector("source");
        if (elementSource)
        {
            elementSource.src = audio;
        }
        if (elementAudio)
        {
            elementAudio.load();
            elementAudio.play();
        }
        // End Play Music

        // Display Play Button
        elementPlayAudio.classList.remove("hidden")
        // End Display Play Button
    }

    return (
        <>
            <button
                className="bg-[#00ADEF] rounded-[50%] p-[8px] text-white"
                onClick={handlePlay}
            >
                <FaPlay />
            </button>
        </>
    );
}