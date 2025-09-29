"use client"

import { useEffect, useState } from "react";
import { SongItem } from "../../../components/SongItem/SongItem";
import { SongItemSkeleton } from "@/app/components/SongItem/SongItemSkeleton";

export const DataSection1 = () => {
    const [songList, setSongList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/random-list`)
            .then((res) => res.json())
            .then((data) => {
                setSongList(data.songList);
            })
    }, [])

    return (
        <>
            {!songList.length
                ? Array.from({ length: 4 }).map((_, i) => <SongItemSkeleton key={i} />)
                : songList.map((item, i) => <SongItem key={i} item={item} />)}
        </>
    );
}