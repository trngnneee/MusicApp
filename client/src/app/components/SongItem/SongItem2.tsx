"use client"

import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import { HeartButton } from "../Button/HeartButton";
import { userUseAuth } from "@/hooks/userUseAuth";

export const SongItem2 = (props: { item: any }) => {
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
                <div className="grid grid-cols-12 items-center bg-[#212121] px-[15px] py-[10px] rounded-[15px] gap-[10px]">
                    {/* Avatar - 1 column */}
                    <div className="col-span-1">
                        <img
                            src={item.avatar}
                            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] xl:w-[60px] xl:h-[60px] object-cover rounded-[8px]"
                            alt={item.name}
                        />
                    </div>

                    {/* Song name - responsive columns */}
                    <div className="col-span-5 lg:col-span-5">
                        <div className="text-white font-[600] text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[16px] line-clamp-1">
                            {item.name}
                        </div>
                    </div>

                    {/* Singer name - responsive columns */}
                    <div className="col-span-4 lg:col-span-4">
                        <div className="text-white font-[400] text-[8px] sm:text-[10px] lg:text-[12px] xl:text-[14px] opacity-70 line-clamp-1">
                            {item.singer.join(", ")}
                        </div>
                    </div>

                    {/* Action buttons - 2 columns */}
                    <div className="col-span-2 flex justify-end items-center gap-[8px]">
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