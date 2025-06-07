"use client"

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { PreButton } from "../Button/PreButton";
import { NextButton } from "../Button/NextButton";
import { LoopButton } from "../Button/LoopButton";
import { authFireBase } from "@/app/FirebaseConfig";

export const PlayMidButton = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fecthUserID = () => {
            onAuthStateChanged(authFireBase, (user) => {
                if (user) setUserId(user.uid);
                else setUserId(null);
            })
        }
        fecthUserID();
    }, [])

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
                {userId && (
                    <>
                        <button className="p-0" onClick={handlePlayList}>
                            <BiSolidPlaylist />
                        </button>
                    </>
                )}
                <PreButton />
                <button
                    className="inner-button-play"
                    onClick={handleClick}
                >
                    <FaPause className="inner-icon-pause" />
                    <FaPlay className="inner-icon-play" />
                </button>
                <NextButton />
                <LoopButton/>
            </div>
        </>
    );
}