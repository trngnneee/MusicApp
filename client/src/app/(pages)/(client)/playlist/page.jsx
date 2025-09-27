"use client"

import { Title } from "@/app/components/Title/Title";
import { PlaylistItem } from "@/app/components/PlaylistItem/PlaylistItem"
import { useEffect, useState } from "react";
import { userUseAuth } from "@/hooks/userUseAuth";

export default function Playlist(){
  const [playlist, setPlaylist] = useState([]);
  const { isLogin, userInfo } = userUseAuth();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == "success")
        {
          setPlaylist(data.playlist);
        }
      })
  }, [])
  
  return (
    <>
      <Title
        title="Danh sách Playlist"
      />
      <div className="flex flex-col justify-between gap-[5px] sm:gap-[15px]">
        {userInfo && playlist.length > 0 && playlist.map((item, index) => (
          <PlaylistItem
            item={item}
            key={index}
            userInfo={userInfo}
          />
        ))}
      </div>
    </>
  );
}