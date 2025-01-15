"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { dbFirebase } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const DataSection = (props) => {
    const { id } = props;
    const [dataSection, setDataSection] = useState(null);
    const songRef = ref(dbFirebase, 'songs');

    useEffect(() => {
        const fetchData = async () => {
            const items = await get(songRef);
            const itemArray = Object.entries(items.val() || {});
            const tmp = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (const [key, data] of itemArray as [string, any][]) {
                if (data.categoryId === id) {
                    const singerArray = [];
                    for (const singer of data.singerId) {
                        const singerRef = ref(dbFirebase, 'singers/' + singer);
                        const snapshot = await get(singerRef);
                        const dataSinger = snapshot.val();
                        singerArray.push(dataSinger.title);
                    }
                    const singerList = singerArray.join(", ");

                    const audio = new Audio(data.audio);
                    const duration = await new Promise<number>((resolve) => {
                        audio.addEventListener('loadedmetadata', () => {
                            resolve(audio.duration);
                        })
                    })
                    const minutes = Math.floor(duration / 60);
                    const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
                    const formatTime = `${minutes}:${seconds}`;

                    tmp.push({
                        id: key,
                        img: data.image,
                        title: data.title,
                        singer: singerList,
                        listener: data.listen,
                        link: `/songs/${key}`,
                        time: formatTime,
                        audio: data.audio
                    });
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