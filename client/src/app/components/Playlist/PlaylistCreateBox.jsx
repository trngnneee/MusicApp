"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MdOutlineAddToPhotos } from "react-icons/md"
import JustValidate from "just-validate"
import { toast } from "sonner"

export const PlaylistCreateBox = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    // ✅ Đợi DOM render xong trước khi khởi tạo
    const timer = setTimeout(() => {
      const form = document.querySelector("#playlist-form")
      if (!form) return // vẫn chưa có thì dừng

      const validation = new JustValidate("#playlist-form")

      validation
        .addField("#name", [
          {
            rule: "required",
            errorMessage: "Vui lòng đặt tên cho Playlist!",
          },
        ])
        .onSuccess((event) => {
          const name = event.target.name.value
          event.target.name.value = ""

          const finalData = { name }

          const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/playlist/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
            credentials: "include",
          }).then((res) => res.json())

          toast.promise(promise, {
            loading: "Đang xử lý...",
            success: (data) => {
              if (data.code === "success") {
                setOpen(false)
              }
              return data.message
            },
            error: (data) => data.message,
          })
        })
    }, 50) // nhỏ thôi, 50ms là đủ

    return () => clearTimeout(timer)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0"
        >
          <span className="text-[12px] xl:text-[25px] mr-[15px]">
            <MdOutlineAddToPhotos  />
          </span>
          <span className="font-[700] text-[12px] xl:text-[18px]">Tạo Playlist</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="z-[100] w-2/3 bg-[#333232] border-none">
        <div className="flex flex-col items-center mt-[10px] sm:mt-[30px]">
          <DialogTitle className="text-[20px] sm:text-[36px] font-bold text-white mb-[10px] sm:mb-[30px]">
            Tên Playlist của bạn
          </DialogTitle>

          <form
            id="playlist-form"
            className="w-full px-[15px] sm:px-[40px] flex flex-col items-center"
          >
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Playlist #1"
              className="bg-[#333232] outline-none text-[#F1F4F9] border-b border-black py-[5px] sm:py-[10px] w-full text-center text-[12px] sm:text-[16px] mb-[5px]"
            />
            <div
              className="mb-[10px] sm:mb-[20px] text-[8px] sm:text-[12px]"
              id="name-container"
            ></div>
            <button
              type="submit"
              className="bg-main py-[10px] px-[30px] sm:px-[50px] text-white text-[10px] sm:text-[16px] font-bold rounded-[12px] mb-[10px] sm:mb-[20px] hover:bg-hoverMain"
            >
              Tạo
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}