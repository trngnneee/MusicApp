"use client"
import { useEffect, useState, useRef } from "react";
import { HiOutlineQueueList } from "react-icons/hi2";
import { QueueItem } from "./QueueItem";
import Link from "next/link";

export const QueueButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [songList, setSongList] = useState<any[]>([]);
  const [currentSong, setCurrentSong] = useState<any>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadPlaylist = () => {
    try {
      const currentPlaylist = localStorage.getItem("currentPlaylist");
      if (currentPlaylist) {
        setSongList(JSON.parse(currentPlaylist));
      }

      const currentSongData = localStorage.getItem("currentSong");
      if (currentSongData) {
        setCurrentSong(JSON.parse(currentSongData));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  };

  useEffect(() => {
    loadPlaylist();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "currentPlaylist" || e.key === "currentSong") {
        loadPlaylist();
      }
    };

    const handlePlaylistUpdated = () => {
      loadPlaylist();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("playlistUpdated", handlePlaylistUpdated);

    window.addEventListener("currentSongUpdated", loadPlaylist);

    if (isVisible) {
      startPolling();
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("playlistUpdated", handlePlaylistUpdated);
      window.removeEventListener("currentSongUpdated", loadPlaylist);
      stopPolling();
    };
  }, [isVisible]);

  const startPolling = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      loadPlaylist();
    }, 1000);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleViewQueue = () => {
    loadPlaylist();

    const newVisibleState = !isVisible;
    setIsVisible(newVisibleState);

    if (newVisibleState) {
      startPolling();
    } else {
      stopPolling();
    }
  };

  return (
    <>
      <button onClick={handleViewQueue} className="relative hidden md:block">
        <HiOutlineQueueList />
        {songList && songList.length > 0 && (
          <div className={`absolute bottom-[20px] right-[-150px] w-[350px] max-h-[500px] overflow-y-auto rounded-[10px] bg-[#333232] p-[10px] z-50 ${isVisible ? "block" : "hidden"}`}>
            <div className="text-white font-bold mb-2">Danh sách phát ({songList.length})</div>

            {currentSong && (
              <div className="border-b-[1px] border-b-[#ddd] mb-2">
                <div className="flex items-center gap-[20px] hover:bg-[#ffffff0b] mb-[10px] p-[10px] rounded-[8px] bg-[#ffffff1a]">
                  <div className="w-[50px] aspect-square relative">
                    <img
                      src={currentSong.avatar}
                      className="w-full h-full object-cover rounded-[5px]"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/music.png";
                      }}
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00ADEF] flex items-center justify-center rounded-full">
                      <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div>
                    <Link href={`/songs/${currentSong.id}`} className="text-[14px] font-bold text-white text-left line-clamp-1">
                      {currentSong.name} <span className="text-[10px] opacity-50">(Đang phát)</span>
                    </Link>
                    <div className="flex gap-[3px] text-white/70">
                      {currentSong.singer.map((singer: any, index: number) => (
                        <Link
                          href={`/singers/${singer.slug}`}
                          className="line-clamp-1 hover:underline text-[10px]"
                          key={index}
                        >
                          {singer.name}{index !== currentSong.singer.length - 1 ? ", " : ""}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {songList.map((item, index) => (
              currentSong && item.id !== currentSong.id && (
                <QueueItem
                  item={item}
                  key={index}
                />
              )
            ))}
          </div>
        )}
      </button>
    </>
  );
};