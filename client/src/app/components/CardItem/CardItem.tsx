"use client"

import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { toast } from "sonner";

export const CardItem = (props: { item: any }) => {
    const { item } = props;
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayPlaylist = (event: React.MouseEvent, api: string) => {
        event.preventDefault();
        event.stopPropagation();

        fetch(api)
            .then((res) => res.json())
            .then((data) => {
                if (!data.songList || !data.songList.length)
                {
                    toast.error("Chưa có bài hát nào trong Danh mục!");
                    return;
                }

                const songList = data.songList;
                localStorage.setItem("currentPlaylist", JSON.stringify(songList));
                localStorage.setItem("currentSongIndex", JSON.stringify(0));
                localStorage.setItem("currentSong", JSON.stringify(songList[0]));

                playSong(songList[0]);
            })
    }

    return (
        <>
            <Link href={item.link}>
                <div
                    className="flex flex-col hover:bg-[#ffffff0b] p-[10px] rounded-[10px]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="w-full aspect-square overflow-hidden mb-[10px] relative">
                        <img
                            src={item.avatar}
                            className="mb-[10px] w-full h-full object-cover rounded-[10px]"
                        />
                        {isHovered && (
                            <div className="absolute bottom-[5px] right-[5px] rounded-[10px]">
                                <button
                                    onClick={(event) => handlePlayPlaylist(event, item.api)}
                                    className="w-[50px] h-[50px] flex items-center justify-center text-white rounded-full bg-[#00ADEF] hover:bg-[#277594] transition-all duration-200"
                                >
                                    <FaPlay className="ml-1" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="text-[12px] md:text-[14px] font-[700] mb-[5px] md:mb-[8px] text-white line-clamp-1">{item.name}</div>
                    <div className="text-[10px] md:text-[12px] font-[300] text-[#FFFFFF80] line-clamp-1">{item.description}</div>
                </div>
            </Link>
        </>
    );
}