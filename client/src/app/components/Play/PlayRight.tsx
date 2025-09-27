"use client"

import { useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export const PlayRight = () => {
  const [mute, setMute] = useState(false);
  const [lastVolume, setLastVolume] = useState(50); // lưu volume trước khi mute

  const handleChange = (event: any) => {
    const value = parseInt(event.target.value);

    const elementPlayAudio: any = document.querySelector(".play-audio");
    const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
    const elementCurrent = elementPlayAudio.querySelector(".inner-volume .inner-volume-current");

    if (elementAudio) {
      elementAudio.volume = value / 100;
    }
    if (elementCurrent) {
      elementCurrent.style.width = `${value}%`;
    }

    if (mute && value > 0) {
      setMute(false);
    }

    setLastVolume(value);
  };

  const handleMute = () => {
    const elementPlayAudio: any = document.querySelector(".play-audio");
    const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
    const elementCurrent = elementPlayAudio.querySelector(".inner-volume .inner-volume-current");
    const elementTotal: any = elementPlayAudio?.querySelector(".inner-volume-total");

    if (!mute) {
      if (elementAudio) elementAudio.volume = 0;
      if (elementCurrent) elementCurrent.style.width = "0%";
      if (elementTotal) elementTotal.value = 0;
    } else {
      if (elementAudio) elementAudio.volume = lastVolume / 100;
      if (elementCurrent) elementCurrent.style.width = `${lastVolume}%`;
      if (elementTotal) elementTotal.value = lastVolume;
    }

    setMute(!mute);
  };

  return (
    <div className="flex flex-row items-center gap-[10px] inner-volume">
      <button onClick={handleMute} className="text-[22px]">
        {!mute ? (
          <FaVolumeUp className="text-white" />
        ) : (
          <FaVolumeMute className="text-white" />
        )}
      </button>
      <div className="relative translate-y-[-5px] w-[100px]">
        <div className="h-[5px] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[13px] inner-volume-current w-[50%]"></div>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          className="w-full h-[4px] bg-[#FFFFFF0A] appearance-none rounded-[50px] cursor-pointer range-sm inner-volume-total"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};