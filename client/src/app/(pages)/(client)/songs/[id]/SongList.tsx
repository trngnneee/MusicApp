"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { useEffect, useState } from "react";

export const SongList = (props: {
    id: string
}) => {
    const { id } = props;
    const [songList, setSongList] = useState<any[]>([])

    useEffect(() => {
        if (!id) return;

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/song-list/${id}?limit=3`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setSongList(data.songList);
            })
    }, [id])

    return (
        <>
            {songList && (
                songList.map((item, index) => (
                    <div data-aos="fade-up" key={index}>
                        <SongItem2
                            item={item}
                        />
                    </div>
                ))
            )}
        </>
    );
}