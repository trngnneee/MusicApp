"use client"

import { CardItem } from "@/app/components/CardItem/CardItem";
import { useEffect, useState } from "react";

export const DataSection3 = () => {
    const [singerList, setSingerList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/singer/list?limit=5`)
            .then((res) => res.json())
            .then((data) => {
                for (const item of data.singerList)
                {
                    item.api = `${process.env.NEXT_PUBLIC_BASE_URL}/song/singer-list/${item.slug}`;
                }
                setSingerList(data.singerList);
            })
    }, [])

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-[20px]">
                {singerList && singerList.map((item, index) => (
                    <div data-aos="fade-up" key={index}>
                        <CardItem
                            item={item}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}