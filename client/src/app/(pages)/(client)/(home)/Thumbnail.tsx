"use client"

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export const Thumbnail = () => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: ["Khám phá giai điệu mới 🎶", "Âm nhạc dành riêng cho bạn ❤️", "MusicApp - Your Sound, Your World"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <div className="sm:h-[400px] rounded-[20px] overflow-hidden">
        <img src="/background1.png" className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 right-0">
        <img src="/human1.svg" alt="Human illustration" className="w-[150px] sm:w-full"/>
      </div>

      <div className="absolute top-[20px] sm:top-[50px] left-[30px] pr-[30px]">
        <div className="text-[40px] sm:text-[50px] text-white font-extrabold">
          MusicApp
        </div>

        <div className="text-[16px] sm:text-[24px] text-white font-semibold sm:mt-2">
          <span ref={el}></span>
        </div>

        <div className="text-white font-bold text-left mt-[20px] max-w-[200px] sm:max-w-[300px] text-[10px] sm:text-[16px]">
          Âm nhạc được cá nhân hóa theo phong cách của bạn, từ những bản hit mới nhất cho đến playlist dành riêng cho từng khoảnh khắc.
        </div>
        <div className="text-[#fff] font-light text-[12px] mt-[10px]">Happy Listening! - trngn.neee</div>
      </div>
    </div>
  );
};