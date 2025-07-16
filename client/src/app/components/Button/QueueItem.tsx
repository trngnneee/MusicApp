import { playSong } from "@/helper/playSong";
import Link from "next/link";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

export const QueueItem = (props: {
  item: any
}) => {
  const [hover, setHover] = useState(false);
  const { item } = props;

  const handlePlay = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    const currentPlaylist = JSON.parse(localStorage.getItem("currentPlaylist"));

    const itemIndex = currentPlaylist.findIndex(song => song.id == item.id);
    const newPlaylist = currentPlaylist.slice(itemIndex);

    localStorage.setItem("currentPlaylist", JSON.stringify(newPlaylist));
    localStorage.setItem("currentSongIndex", JSON.stringify(0));
    localStorage.setItem("currentSong", JSON.stringify(item));

    playSong(item);
  }

  return (
    <>
      <div
        className="flex items-center gap-[20px] hover:bg-[#ffffff0b] mb-[10px] p-[10px] rounded-[8px]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="w-[50px] aspect-square relative">
          <img src={item.avatar} className="w-full h-full object-cover" />
          <div
            className={`absolute top-[18px] left-[18px] ${hover ? "block" : "hidden"}`}
            onClick={(event) => { handlePlay(event, item) }}
          >
            <FaPlay />
          </div>
        </div>
        <div>
          <div className="text-[14px] font-bold text-left line-clamp-1">
            {item.name}
          </div>
          <div className="flex gap-[3px]">
            {item.singer.map((singer, index) => (
              <Link href={`/songs/${singer.slug}`} className="line-clamp-1 hover:underline text-[10px]" key={index}>{singer.name} {index != item.singer.length - 1 ? "," : ""}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}