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

        // Display image, title, singer
        const elementImage = elementPlayAudio.querySelector(".inner-image");
        elementImage.src = item.img;
        
        const elementTitle = elementPlayAudio.querySelector(".inner-title");
        elementTitle.innerHTML = item.title;

        const elementSinger = elementPlayAudio.querySelector(".inner-singer");
        elementSinger.innerHTML = item.singer;
        // End Display image, title, singer

        // Display Pause 
        const elementPauseButton = elementPlayAudio.querySelector(".inner-button-play");
        elementPauseButton.classList.add("play");
        // End Display Pause

        // Get total time of song
        const elementTotalTime = elementPlayAudio.querySelector(".inner-time .inner-time-total");
        const elementCurrentTime = elementPlayAudio.querySelector(".inner-time .inner-time-current");
        elementAudio.onloadedmetadata = () => {
            const totalTime = elementAudio.duration;
            elementTotalTime.max = totalTime;

            // Get current time of song
            elementAudio.ontimeupdate = () => {
                const currentTime = elementAudio.currentTime;
                const percent = currentTime * 100 / totalTime;
                elementCurrentTime.style.width = `${percent}%`;
                elementTotalTime.value = currentTime;
            }
            // End Get current time of song
        }
        // End Get total time of song
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