"use client"

import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import { HeartButton } from "../Button/HeartButton";
import { userUseAuth } from "@/hooks/userUseAuth";

export const SongItem = (props: { item: any }) => {
    const { item } = props;
    const { isLogin, userInfo } = userUseAuth();

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
                    <div className="w-[76px] lg:w-[50px] xl:w-[76px] h-[76px] lg:h-[50px] xl:h-[76px]">
                        <img
                            src={item.avatar}
                            className="w-full h-full rounded-[10px]"
                        />
                    </div>
                    <div className="flex flex-col flex-1 ml-[10px] p-0">
                        <Link href={item.link} className="text-white font-[600] text-[10px] lg:text-[14px] xl:text-[15px] mb-[2px] xl:mb-[5px]">{item.name}</Link>
                        <div className="flex gap-[3px]">
                            {item.singer.map((singer: any, index: number) => (
                                <Link href={`/singers/${singer.slug}`} className="text-[#FFFFFF80] font-[400] text-[9px] xl:text-[12px] mb-[2px] xl:mb-[8px] hover:underline" key={index}>{singer.name} {index != item.singer.length - 1 ? "," : ""}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <button
                            onClick={(event) => handlePlaySong(event, item)}
                            className="text-[white] rounded-[50%] p-[5px] sm:p-[8px] text-[10px] sm:text-[15px] bg-[#00ADEF] hover:bg-[#277594]"
                        >
                            <FaPlay className="ml-1" />
                        </button>
                        {isLogin && (
                            <HeartButton
                                item={item}
                                api={`${process.env.NEXT_PUBLIC_BASE_URL}/user/wishlist/${item.id}`}
                                wishlist={userInfo.wishlist}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}