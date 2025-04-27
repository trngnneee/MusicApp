"use client"

import { PlayLeft } from "./PlayLeft";
import { PlayMid } from "./PlayMid";
import { PlayRight } from "./PlayRight";

export const Play = () => {   
    return (
        <>
            <div className="bg-[#212121] fixed bottom-0 left-0 z-[999] py-[20px] w-[100%] border-t-[1px] border-t-solid border-[#494949] hidden play-audio" id="">
                <audio className="hidden inner-audio">
                    <source src="/" />
                </audio>
                <div className="container mx-auto flex flex-row gap-[10px] sm:gap-[5px] sm:justify-between items-center">
                    <PlayLeft />
                    <PlayMid />
                    <div className="hidden md:block">
                        <PlayRight />
                    </div>
                </div>
            </div>
        </>
    );
}