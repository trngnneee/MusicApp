"use client"

import { FaVolumeUp } from "react-icons/fa";

export const PlayRight = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any) => {
        const elementTotal = event.target;
        const value = parseInt(elementTotal.value);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const elementPlayAudio: any = document.querySelector(".play-audio");
        const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
        elementAudio.volume = value / 100;

        const elementCurrent = elementPlayAudio.querySelector(".inner-volume .inner-volume-current");
        elementCurrent.style.width = `${value}%`;
    }
    
    return (
        <>
            <div className="flex items-end gap-[6px] inner-volume">
                <button>
                    <FaVolumeUp className="text-white" />
                </button>
                <div className="relative">
                    <div className="h-[4px] w-[80%] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[13px] inner-volume-current"></div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={80}
                        className="w-full h-[4px] bg-[#FFFFFF0A] appearance-none rounded-[50px] cursor-pointer range-sm inner-volume-total"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}