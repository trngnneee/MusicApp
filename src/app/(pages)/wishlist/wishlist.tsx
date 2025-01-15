"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export const Wishlist = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        onAuthStateChanged(authFireBase, (user) => {
            if (user) {
                const userId = user.uid;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dataSection: any[] = [];
                const songRef = ref(dbFirebase, 'songs');
                const fetchData = async () => {
                    const items = await get(songRef);

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    items.forEach((item: any) => {
                        const key = item.key;
                        const data = item.val();

                        const wishlist = data.wishlist;
                        if (wishlist && wishlist[userId]) {
                            dataSection.push({
                                id: key,
                                img: data.image,
                                title: data.title,
                                singer: "",
                                singerId: data.singerId,
                                listener: data.listen,
                                link: `/songs/${key}`,
                                audio: data.audio,
                                wishlist: data.wishlist,
                                time: ""
                            })
                        }
                    });
                    for (const item of dataSection) {
                        const audio = new Audio(item.audio);
                        const duration = await new Promise<number>((resolve) => {
                            audio.addEventListener('loadedmetadata', () => {
                                resolve(audio.duration);
                            })
                        })
                        const minutes = Math.floor(duration / 60);
                        const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
                        const formatTime = `${minutes}:${seconds}`;

                        item.time = formatTime;

                        const singerListArray = [];
                        for (const id of item.singerId) {
                            const singerSnapshot = await get(ref(dbFirebase, 'singers/' + id));
                            const singerData = singerSnapshot.val();
                            singerListArray.push(singerData.title);
                        }
                        item.singer = singerListArray.join(", ");
                    }
                    setData(dataSection);
                }
                fetchData();
            }
            else {
                Swal.fire({
                    title: "Vui Lòng Đăng Nhập",
                    icon: "error",
                    showConfirmButton: true
                });
            }
        })
    }, [])

    return (
        <>
            <div>
                {(data && data.length > 0) ? (
                    data.map((item, index) => (
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
        </>
    );
}