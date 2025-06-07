"use client"

import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { dbFirebase } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const DataCardInfor = (props) => {
    const { id } = props;
    const [dataCardInfor, setDataCardInfor] = useState(null);
    const categoryRef = ref(dbFirebase, 'categories/' + id);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await get(categoryRef);
            const data = snapshot.val();
            let tmp = {};
            tmp = {
                img: data.image,
                title: data.title,
                content: data.description
            };
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