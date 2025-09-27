"use client"

import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

export const PlaylistItem = ({ item, userInfo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPlaylist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const finalData = {
      idList: item.idList
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalData)
    })
      .then((res) => res.json())
      .then((data) => {
        const songList = data.songList;
        localStorage.setItem("currentPlaylist", JSON.stringify(songList));
        localStorage.setItem("currentSongIndex", JSON.stringify(0));
        localStorage.setItem("currentSong", JSON.stringify(songList[0]));

        playSong(songList[0]);
      })
  }

  return (
    <>
      <Link
        href={`/playlist/detail?name=${item.name}`}
        className="bg-[#1a1a1a34] hover:bg-[#ffffff0b] p-[5px] sm:p-[20px] rounded-[20px] border-[1px] border-[grey] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-[20px]">
          <div className="w-[50px] sm:w-[100px] h-[50px] sm:h-[100px] overflow-hidden aspect-square rounded-[10px]">
            <img
              src={item.avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-white text-[14px] sm:text-[20px] font-bold">{item.name}</div>
            <div className="text-white text-[10px] sm:text-[14px] font-semibold">{userInfo.fullName}</div>
            <div className="text-[grey] text-[8px] sm:text-[12px] font-semibold">{item.idList.length} Bài hát</div>
          </div>
        </div>

        <div
          className={`absolute bottom-[10px] right-[10px] transition-all duration-300 
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <button
            onClick={(event) => handlePlayPlaylist(event)}
            className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] flex items-center justify-center text-white rounded-full bg-[#00ADEF] hover:bg-[#277594] transition-all duration-200"
          >
            <FaPlay className="ml-1" />
          </button>
        </div>
      </Link>
    </>
  );
};