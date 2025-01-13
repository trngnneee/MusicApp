import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { PreButton } from "../Button/PreButton";
import { NextButton } from "../Button/NextButton";

export const PlayMidButton = () => {
    const router = useRouter();

    const handleClick = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const handlePlayList = () => {
        router.push("/playlist");
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
                <button className="p-0" onClick={handlePlayList}>
                    <BiSolidPlaylist />
                </button>
            </div>
        </>
    );
}