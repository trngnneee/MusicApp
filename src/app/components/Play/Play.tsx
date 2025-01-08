"use client"

import { useEffect, useState } from "react";
import { PlayLeft } from "./PlayLeft";
import { PlayMid } from "./PlayMid";
import { PlayRight } from "./PlayRight";
import { onAuthStateChanged } from "firebase/auth";
import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { get, onValue, ref } from "firebase/database";
import { SongItem2 } from "../SongItem/SongItem2";

export const Play = () => {
    const [userId, setUserId] = useState(null);
    const [playlist, setPlayList] = useState(null);
    const [dataSection, setDataSection] = useState(null);

    useEffect(() => {
        const fetchUserID = () => {
            onAuthStateChanged(authFireBase, (user) => {
                if (user) setUserId(user.uid);
                else setUserId(null);
            })
        }
        fetchUserID();
    }, [])

    useEffect(() => {
        const fetchPlayList = () => {
            const playListRef = ref(dbFirebase, `users/${userId}/playlist`);
            onValue(playListRef, (snapshot) => {
                const data = snapshot.val();
                setPlayList(data);
            })
        }
        if (userId != null) fetchPlayList();
    }, [userId])

    useEffect(() => {
        const songRef = ref(dbFirebase, 'songs');
        const tmp = [];

        const fetchData = async () => {
            const items = await get(songRef);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            items.forEach((item: any) => {
                const key = item.key;
                const data = item.val();

                if (playlist.includes(key)) {
                    tmp.push({
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
            for (const item of tmp) {
                const itemSinger = await get(ref(dbFirebase, 'singers/' + item.singerId[0]));
                const dataSinger = itemSinger.val();
                item.singer = dataSinger.title;
            }
            setDataSection(tmp);
        }

        if (playlist != null) fetchData();
    }, [playlist])

    return (
        <>
            <div className="bg-[#212121] fixed bottom-0 left-0 z-[999] py-[20px] w-[100%] border-t-[1px] border-t-solid border-[#494949] hidden play-audio" id="">
                <audio className="hidden inner-audio">
                    <source src="/" />
                </audio>
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left */}
                    <PlayLeft />
                    {/* Mid */}
                    <PlayMid />
                    {/* Right */}   
                    <PlayRight />

                </div>
                <div className="hidden song-item-2">
                    {dataSection && (
                        dataSection.map((item, index) => (
                            <div
                                key={index}
                                id={`${item.id}`}
                            >
                                <SongItem2
                                    item={item}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}