"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { dbFirebase } from "@/app/FirebaseConfig";
import { get, onValue, ref } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchResult = () => {
    const searchParams = useSearchParams();
    const [dataFinal, setDataFinal] = useState<any>(null);

    const defaultKeyword = searchParams.get("keyword") || "";

    useEffect(() => {
        const dataSection: any[] = [];
        const songRef = ref(dbFirebase, 'songs');
        const fetchData = async () => {
            const items = await get(songRef);

            items.forEach((item: any) => {
                const key = item.key;
                const data = item.val();

                if (data.title.includes(defaultKeyword)) {
                    dataSection.push({
                        id: key,
                        img: data.image,
                        title: data.title,
                        singer: "",
                        singerId: data.singerId,
                        listener: data.listen,
                        link: `/songs/${key}`,
                        audio: data.audio
                    })
                }
            });
            for (const item of dataSection) {
                let singerListArray = [];
                for (const id of item.singerId) {
                    const singerSnapshot = await get(ref(dbFirebase, 'singers/' + id));
                    const singerData = singerSnapshot.val();
                    singerListArray.push(singerData.title);
                }
                item.singer = singerListArray.join(", ");
            }
            setDataFinal(dataSection);
        }
        fetchData();
    }, [defaultKeyword]);

    return (
        <>
            <div>
                {dataFinal && (
                    <>
                        {dataFinal.map((item: any, index: number) => (
                            <div data-aos="fade-up" key={index}>
                                <SongItem2
                                    item={item}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}