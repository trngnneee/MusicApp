"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchResult = () => {
    const searchParams = useSearchParams();
    const [songList, setSongList] = useState<any[]>([]);

    const defaultKeyword = searchParams.get("keyword") || "";

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/list?keyword=${defaultKeyword}`)
            .then((res) => res.json())
            .then((data) => {
                setSongList(data.songList);
            })
    }, [defaultKeyword]);

    return (
        <>
            <div className="flex flex-col gap-[10px]">
                {songList && (
                    <>
                        {songList.map((item: any, index: number) => (
                            <div data-aos="fade-up" key={index}>
                                <SongItem2
                                    item={item}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}