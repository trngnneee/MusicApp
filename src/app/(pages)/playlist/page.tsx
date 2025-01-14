"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function PlayListPage() {
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
            for (const id of playlist) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                items.forEach((item: any) => {
                    const key = item.key;
                    const data = item.val();

                    if (key === id) {
                        tmp.push({
                            id: key,
                            img: data.image,
                            title: data.title,
                            singer: "",
                            singerId: data.singerId,
                            listener: data.listen,
                            link: `/songs/${key}`,
                            audio: data.audio,
                            wishlist: data.wishlist
                        })
                    }
                });
            }
            for (const item of tmp) {
                const singerListArray = [];
                for (const id of item.singerId) {
                    const singerSnapshot = await get(ref(dbFirebase, 'singers/' + id));
                    const singerData = singerSnapshot.val();
                    singerListArray.push(singerData.title);
                }
                item.singer = singerListArray.join(", ");
            }
            setDataSection(tmp);
        }

        if (playlist != null) fetchData();
    }, [playlist])

    return (
        <>
            <div>
                <Title
                    title="Danh Sách Phát"
                />
                <div>
                    {(dataSection && dataSection.length > 0) ? (
                        dataSection.map((item, index) => (
                            <div data-aos="fade-up" key={index}>
                                <SongItem2
                                    item={item}
                                />
                            </div>
                        ))
                    ) : (
                        <Title
                            title="Chưa có bài hát yêu thích"
                            className="text-center text-[#444343]"
                        />
                    )}
                </div>
            </div>
        </>
    );
};