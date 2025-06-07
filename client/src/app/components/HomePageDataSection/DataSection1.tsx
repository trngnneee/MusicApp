"use client"

import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { SongItem } from "../SongItem/SongItem";
import { dbFirebase } from "@/app/FirebaseConfig";

export const DataSection1 = () => {
    const [dataSection, setDataSection] = useState(null);
    const songRef = ref(dbFirebase, 'songs');

    useEffect(() => {
        const fetchData = async () => {
            const items = await get(songRef);
            const itemArray = Object.entries(items.val() || {});
            const tmp = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (const [key, data] of itemArray as [string, any][]) {
                if (true) {
                    const singerArray = [];
                    for (const singer of data.singerId) {
                        const singerRef = ref(dbFirebase, 'singers/' + singer);
                        const snapshot = await get(singerRef);
                        const dataSinger = snapshot.val();
                        singerArray.push(dataSinger.title);
                    }
                    const singerList = singerArray.join(", ");
                    if (tmp.length < 3) {
                        tmp.push({
                            id: key,
                            img: data.image,
                            title: data.title,
                            singer: singerList,
                            listener: data.listen,
                            link: `/songs/${key}`,
                            audio: data.audio,
                            wishlist: data.wishlist
                        });
                    }
                }
            }
            setDataSection(tmp);
        }
        fetchData();
    }, [])

    return (
        <>
            {dataSection && (
                dataSection.map((item, index) => (
                    <div data-aos="fade-left" key={index}>
                        <SongItem
                            item={item}
                        />
                    </div>
                ))
            )}
        </>
    );
}