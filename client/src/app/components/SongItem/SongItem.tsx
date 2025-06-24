"use client"

import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

export const SongItem = (props: { item: any }) => {
    const { item } = props;

    const handlePlaySong = (event: React.MouseEvent, item: any) => {
        event.preventDefault();
        event.stopPropagation();

        const currentPlayList = [];
        currentPlayList.push(item);
        localStorage.setItem("currentPlaylist", JSON.stringify(currentPlayList));
        localStorage.setItem("currentSongIndex", JSON.stringify(0));
        localStorage.setItem("currentSong", JSON.stringify(item));

        playSong(item);
    }

    return (
        <>
            <div className="mb-[12px]">
                <div className="flex gap-[5px] sm:gap-[15px] items-center bg-[#212121] px-[10px] py-[5px] xl:py-[10px] rounded-[15px]">
                    <img
                        src={item.avatar}
                        className="w-[76px] lg:w-[50px] xl:w-[76px] h-auto rounded-[10px]"
                    />
                    <Link href={item.link} className="flex flex-col flex-1 ml-[10px] p-0">
                        <div className="text-white font-[600] text-[10px] lg:text-[14px] xl:text-[15px] mb-[2px] xl:mb-[5px]">{item.name}</div>
                        <div className="text-[#FFFFFF80] font-[400] text-[9px] xl:text-[12px] mb-[2px] xl:mb-[8px]">{item.singer.join(", ")}</div>
                    </Link>
                    <div className="flex gap-[10px] items-center">
                        <div>
                            <button
                                onClick={(event) => handlePlaySong(event, item)}
                                className="w-[30px] h-[30px] flex items-center justify-center text-white rounded-full bg-[#00ADEF] hover:bg-[#277594] transition-all duration-200"
                            >
                                <FaPlay className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}