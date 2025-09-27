"use client"

import { useEffect, useRef, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { toast } from "sonner";

export const AddPlaylistButton = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist`, {
        credentials: "include"
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylist(data.playlist);
        })
    }
    if (isOpen == true) fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen])

  const handleAddPlaylist = (playlistName) => {
    const finalData = {
      playlistName: playlistName,
      id: item.id
    }

    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist/add`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalData)
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })

    toast.promise(promise, {
      loading: "Đang xử lý...",
      success: (data) => {
        if (data.code == "success") {
          setIsOpen(false);
        }
        return data.message
      },
      error: (data) => data.message
    })
  }

  return (
    <>
      <div
        className={`fixed bottom-[50px] right-0 z-[999] bg-[#333232] rounded-[10px] p-[10px] w-[250px] shadow-lg ${isOpen ? "" : "hidden"}`}
        ref={boxRef}
      >
        <div className="text-[14px] font-bold text-white mb-[10px] text-center border-b-[grey] border-b-[1px] pb-[5px]">Playlist của bạn {`(${playlist.length})`}</div>
        <div className="flex flex-col gap-[10px] max-h-[200px] overflow-y-scroll">
          {playlist.length > 0 && playlist.map((item, index) => (
            <button
              className="p-[8px] rounded-[10px] flex items-center gap-[20px] hover:bg-[#ffffff0b]"
              key={index}
              onClick={() => handleAddPlaylist(item.name)}
            >
              <div className="w-[50px] h-[50px] overflow-hidden">
                <img src={item.avatar} className="w-full h-full object-cover" />
              </div>
              <div className="text-[12px] text-white w-[50%] line-clamp-1 text-left">{item.name}</div>
            </button>
          ))}
        </div>
      </div>
      <button
        className="text-[white] rounded-[50%] border-[1px] md:border-[2px] border-[white] hover:bg-[#9d9c9c43] p-[10px] text-[15px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoAddSharp />
      </button>
    </>
  );
}