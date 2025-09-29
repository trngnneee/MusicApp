"use client"

import { CardItem } from "@/app/components/CardItem/CardItem";
import { CardItemSkeleton } from "@/app/components/CardItem/CardItemSekeleton";
import { useEffect, useState } from "react";

export const DataSection = () => {
    const [categoryList, setCategoryList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list`)
            .then((res) => res.json())
            .then((data) => {
                for (const item of data.categoryList) {
                    item.api = `${process.env.NEXT_PUBLIC_BASE_URL}/song/category-list/${item.slug}`;
                }
                setCategoryList(data.categoryList);
            })
    }, [])

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-[5px] sm:gap-[20px]">
                {!categoryList.length
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <CardItemSkeleton key={index} />
                    ))
                    : categoryList.map((item, index) => (
                        <CardItem key={index} item={item} />
                    ))}
            </div>
        </>
    );
}