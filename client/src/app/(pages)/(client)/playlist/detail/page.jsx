"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { userUseAuth } from "@/hooks/userUseAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPlaylist() {
  const { isLogin, userInfo } = userUseAuth();
  const [songList, setSongList] = useState([]);
  const [playlistDetail, setPlaylistDetail] = useState();

  const searchParam = useSearchParams();
  const name = searchParam.get("name");

  useEffect(() => {
    if (!userInfo) return;

    const playlistDetail = userInfo.playlist.find((item) => item.name == name);
    const idList = playlistDetail.idList;
    setPlaylistDetail(playlistDetail);
    const finalData = {
      idList: idList
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
        setSongList(data.songList);
      })
  }, [userInfo])

  return (
    <>
      <Title
        title="Chi tiết danh sách phát"
      />
      {playlistDetail && (
        <div className="flex items-center gap-[20px] mb-[20px]">
          <img
            src={playlistDetail.avatar}
            className="w-[120px] md:w-[180px] object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/adminAvatar.png";
            }}
          />
          <div>
            <div className="text-[16px] sm:text-[24px] lg:text-[35px] font-[700] text-[#00ADEF] mb-[5px]">{playlistDetail.name}</div>
            <div className="text-[8px] sm:text-[10px] lg:text-[14px] font-bold text-[#EFEEE0]">{userInfo.fullName}</div>
            <div className="text-[8px] sm:text-[10px] lg:text-[14px] font-[300] text-[#EFEEE0]">{playlistDetail.idList.length} Bài hát</div>
          </div>
        </div>
      )}
      {songList.length > 0 && (
        songList.map((item, index) => (
          <div data-aos="fade-up" key={index} className="mb-[10px]">
            <SongItem2
              item={item}
              api={`${process.env.NEXT_PUBLIC_BASE_URL}/song/playlist/${name}`}
            />
          </div>
        ))
      )}
    </>
  );
}