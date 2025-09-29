"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { SongItem2Skeleton } from "@/app/components/SongItem/SongItem2Sekeleton";
import { useEffect, useState } from "react";

export const DataSection = (props: {
    slug: string
}) => {
    const { slug } = props;
    const [songList, setSongList] = useState<any[]>([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/category-list/${slug}`)
            .then(res => res.json())
            .then((data) => {
                setSongList(data.songList);
            })
    }, [])

    return (
        <>
            {songList.length > 0 ? (
                songList.map((item, index) => (
                    <div data-aos="fade-up" key={index} className="mb-[10px]">
                        <SongItem2
                            item={item}
                            api={`${process.env.NEXT_PUBLIC_BASE_URL}/song/category-list/${slug}`}
                        />
                    </div>
                ))
            ) : (
                Array.from({ length: 5 }).map((_, i) => (
                    <SongItem2Skeleton key={i} />
                ))
            )}
        </>
    );
}