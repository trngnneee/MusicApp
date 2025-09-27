"use client"

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import JustValidate from 'just-validate';
import { toast } from "sonner";

export const PlaylistCreateBox = () => {
  const handleClose = () => {
    const playlistBox = document.querySelector(".playlist-box");
    playlistBox.classList.add("hidden");
  }

  useEffect(() => {
    const validation = new JustValidate('#playlist-form');

    validation
      .addField('#name', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng đặt tên cho Playlist!'
        }
      ], {
        errorsContainer: '#name-container'
      })
      .onSuccess((event) => {
        const name = event.target.name.value;
        event.target.name.value = "";

        const finalData = {
          name: name
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(finalData),
          credentials: "include"
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          });

        toast.promise(promise, {
          loading: "Đang xử lý...",
          success: (data) => {
            if (data.code == "success") {
              handleClose();
            }
            return data.message
          },
          error: (data) => data.message
        })
      })
  }, [])

  return (
    <>
      <div className={`fixed left-[40%] mt-[100px] w-[500px] z-[999] bg-[#333232] rounded-[20px] shadow-lg hidden playlist-box`}>
        <div className="flex justify-end mt-[10px] mr-[10px]">
          <button onClick={handleClose} >
            <IoClose className="text-white text-[30px]" />
          </button>
        </div>
        <div className="flex flex-col items-center mt-[30px] ">
          <div className="text-[36px] font-bold text-white mb-[30px]">Tên Playlist của bạn</div>
          <form id="playlist-form" className="w-full px-[40px] flex flex-col items-center">
            <input id="name" type="text" placeholder={"Playlist #1"} className="bg-[#333232] outline-none text-[#F1F4F9] border-b-[1px] border-b-[black] py-[10px] w-full text-center text-[16px] mb-[5px]" />
            <div className="mb-[20px] text-[12px]" id="name-container"></div>
            <button className="bg-main py-[10px] px-[50px] text-white font-bold rounded-[12px] mb-[20px] hover:bg-hoverMain">Tạo</button>
          </form>
        </div>
      </div>
    </>
  );
}