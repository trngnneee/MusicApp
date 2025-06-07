"use client"

import { Title } from "@/app/components/Title/Title";
import { dbFirebase } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const Lyrics = (props) => {
    const { id } = props;
    const [lyric, setLyric] = useState(null);
    const songRef = ref(dbFirebase, '/songs/' + id);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await get(songRef);
            const data = snapshot.val();
            const rawLyric = data.lyric;
            const newLyric = rawLyric.split(" | ").join("\n");
            setLyric(newLyric);
        }
        fetchData();
    }, [])

    return (
        <>
            <Title
                title="Lời Bài Hát"
                className="mt-[20px]"
            />
            <div className="bg-[#212121] rounded-[15px] p-[20px] mb-[15px] text-white text-[14px] font-[500] whitespace-pre-line">
                {lyric}
            </div>
        </>
    );
}