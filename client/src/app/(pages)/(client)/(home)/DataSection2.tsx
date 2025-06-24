"use client"

import { CardItem } from "@/app/components/CardItem/CardItem";
import { useEffect, useState } from "react";

export const DataSection2 = () => {
    const [categoryList, setCategoryList] = useState<any[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list?limit=5`)
            .then((res) => res.json())
            .then((data) => {
                for (const item of data.categoryList)
                {
                    item.api = `${process.env.NEXT_PUBLIC_BASE_URL}/song/category-list/${item.slug}`;
                }
                setCategoryList(data.categoryList);
            })
    }, [])

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-[20px]">
                {categoryList && categoryList.map((item, index) => (
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