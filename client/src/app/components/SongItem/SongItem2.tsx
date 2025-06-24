"use client"

import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

export const SongItem2 = (props: { item: any }) => {
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
                <div className="grid grid-cols-12 items-center bg-[#212121] px-[15px] py-[10px] rounded-[15px] gap-[10px]">
                    <div className="col-span-1">
                        <img
                            src={item.avatar}
                            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] xl:w-[60px] xl:h-[60px] object-cover rounded-[8px]"
                            alt={item.name}
                        />
                    </div>

                    <div className="col-span-5 lg:col-span-6">
                        <div className="text-white font-[600] text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[16px] line-clamp-1">
                            {item.name}
                        </div>
                    </div>

                    <div className="col-span-5 lg:col-span-4">
                        <div className="text-white font-[400] text-[8px] sm:text-[10px] lg:text-[12px] xl:text-[14px] opacity-70 line-clamp-1">
                            {item.singer.join(", ")}
                        </div>
                    </div>

                    <div className="col-span-1 flex justify-end">
                        <button
                            onClick={(event) => handlePlaySong(event, item)}
                            className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] xl:w-[40px] xl:h-[40px] flex items-center justify-center text-white rounded-full bg-[#00ADEF] hover:bg-[#277594] transition-all duration-200 hover:scale-110"
                        >
                            <FaPlay className="text-[10px] sm:text-[12px] xl:text-[14px] ml-[1px]" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}