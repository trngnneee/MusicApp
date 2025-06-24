"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { userUseAuth } from "@/hooks/userUseAuth";
import { useEffect, useState } from "react";

export const Wishlist = () => {
    const { isLogin, userInfo } = userUseAuth();
    const [songList, setSongList] = useState<any[]>([]);

    useEffect(() => {
        if (!userInfo) return;

        const finalData = {
            wishlist: userInfo.wishlist
        }

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/wishlist`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalData)
        })
            .then((res) => res.json())
            .then((data) => {
                setSongList(data.songList);
            })
    }, [userInfo])

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