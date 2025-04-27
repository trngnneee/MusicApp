"use client"

import { CardInfor } from "@/app/components/client/CardInfor/CardInfor";
import { dbFirebase } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const DataCardInfor = (props) => {
    const { id } = props;
    const [dataCardInfor, setDataCardInfor] = useState(null);
    const songRef = ref(dbFirebase, '/songs/' + id);

    useEffect(() => {
        let tmp = {};
        
        const fetchData = async () => {
            const snapshot = await get(songRef);
            const data = snapshot.val();

            const singerArray = [];
            for (const singer of data.singerId)
            {
                const singerRef = ref(dbFirebase, 'singers/' + singer);
                const snapshot = await get(singerRef);
                const dataSinger = snapshot.val();
                singerArray.push(dataSinger.title);
            }
            const singerList = singerArray.join(", ");

            tmp = {
                img: data.image,
                title: data.title,
                content: singerList
            }
            setDataCardInfor(tmp);
        }
        fetchData();
    }, [])
    return (
        <>
            {dataCardInfor && (
                <CardInfor
                    item={dataCardInfor}
                />
            )}
        </>
    );
}