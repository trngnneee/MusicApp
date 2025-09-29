"use client"

import { CardItem } from "@/app/components/CardItem/CardItem";
import { CardItemSkeleton } from "@/app/components/CardItem/CardItemSekeleton";
import { useEffect, useState } from "react";

export const DataSection3 = () => {
    const [singerList, setSingerList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/singer/list?limit=6&rand=1`)
            .then((res) => res.json())
            .then((data) => {
                for (const item of data.singerList) {
                    item.api = `${process.env.NEXT_PUBLIC_BASE_URL}/song/singer-list/${item.slug}`;
                }
                setSingerList(data.singerList);
            })
    }, [])

    const getMaxItems = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1280) return 5;
            else if (window.innerWidth >= 576) return 6;
            return 3;
        }
        return 5;
    }

    return (
        <>
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                {!singerList.length
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <CardItemSkeleton key={index} />
                    ))
                    : singerList.slice(0, getMaxItems()).map((item, index) => (
                        <CardItem key={index} item={item} />
                    ))}
            </div>
        </>
    );
}