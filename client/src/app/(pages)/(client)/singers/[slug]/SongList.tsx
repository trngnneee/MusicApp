"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { useEffect, useState } from "react";

export const SongList = (props: {
    slug: string
}) => {
    const { slug } = props;
    const [songList, setSongList] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/singer-list/${slug}`)
            .then(res => res.json())
            .then((data) => {
                setSongList(data.songList);
            })
    }, [])

    return (
        <>
            {songList && (
                songList.map((item, index) => (
                    <div data-aos="fade-up" key={index} className="mb-[10px]">
                        <SongItem2
                            item={item}
                            api={`${process.env.NEXT_PUBLIC_BASE_URL}/song/singer-list/${slug}`}
                        />
                    </div>
                ))
            )}
        </>
    );
}