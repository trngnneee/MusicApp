"use client"

import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export const Wishlist = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        onAuthStateChanged(authFireBase, (user) => {
            if (user) {
                const userId = user.uid;
                const dataSection: any[] = [];
                const songRef = ref(dbFirebase, 'songs');
                const fetchData = async () => {
                    const items = await get(songRef);

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
                                wishlist: data.wishlist
                            })
                        }
                    });
                    for (const item of dataSection) {
                        const itemSinger = await get(ref(dbFirebase, 'singers/' + item.singerId[0]));
                        const dataSinger = itemSinger.val();
                        console.log(dataSinger);
                        item.singer = dataSinger.title;
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
                {data && (
                    data.map((item, index) => (
                        <div data-aos="fade-up" key={index}>
                            <SongItem2
                                item={item}
                            />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}