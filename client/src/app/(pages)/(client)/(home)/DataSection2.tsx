"use client"

import { CardItem } from "@/app/components/CardItem/CardItem";
import { useEffect, useState } from "react";

export const DataSection2 = () => {
    const [categoryList, setCategoryList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list?limit=6`)
            .then((res) => res.json())
            .then((data) => {
                for (const item of data.categoryList) {
                    item.api = `${process.env.NEXT_PUBLIC_BASE_URL}/song/category-list/${item.slug}`;
                }
                setCategoryList(data.categoryList);
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
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-[10px] lg:gap-[20px]">
                {categoryList && categoryList.slice(0, getMaxItems()).map((item, index) => (
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