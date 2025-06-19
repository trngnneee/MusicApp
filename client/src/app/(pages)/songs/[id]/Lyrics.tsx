"use client"

import { Title } from "@/app/components/Title/Title";
import { useEffect, useState } from "react";

export const Lyrics = (props: {
    lyric: string
}) => {
    const { lyric } = props;

    return (
        <>
            <Title
                title="Lời Bài Hát"
                className="mt-[20px]"
            />
            <div className="bg-[#212121] rounded-[15px] p-[20px] mb-[15px] text-white text-[14px] font-[500] whitespace-pre-line">
                {lyric}
            </div>
        </>
    );
}