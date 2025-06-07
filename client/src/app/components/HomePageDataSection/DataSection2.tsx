"use client"

import { CardItem } from "@/app/components/CardItem/CardItem";
import { dbFirebase } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const DataSection2 = () => {
    const [dataSection, setDataSection] = useState(null);
    const categoryRef = ref(dbFirebase, 'categories');
    useEffect(() => {
        const fetchData = async () => {
            const items = await get(categoryRef);
            const tmp = [];
            items.forEach((item) => {
                const key = item.key;
                const data = item.val();
                if (tmp.length < 5)
                {
                    tmp.push({
                        id: key,
                        img: data.image,
                        title: data.title,
                        content: data.description,
                        link: `/category/${key}`
                    })
                }
                setDataSection(tmp);
            })
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-[20px]">
                {dataSection && dataSection.map((item, index) => (
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