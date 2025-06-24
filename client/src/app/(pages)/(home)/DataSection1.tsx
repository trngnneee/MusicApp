"use client"

import { useEffect, useState } from "react";
import { SongItem } from "../../components/SongItem/SongItem";

export const DataSection1 = () => {
    const [songList, setSongList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/list?limit=3`)
            .then((res) => res.json())
            .then((data) => {
                setSongList(data.songList);
            })
    }, [])

    return (
        <>
            {songList && (
                songList.map((item, index) => (
                    <div data-aos="fade-left" key={index}>
                        <SongItem
                            item={item}
                        />
                    </div>
                ))
            )}
        </>
    );
}