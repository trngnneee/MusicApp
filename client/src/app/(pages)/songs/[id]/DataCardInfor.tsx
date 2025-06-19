"use client"

import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { useEffect, useState } from "react";

export const DataCardInfor = (props: {
    id: string,
    onFetchSuccess?: (item: any) => void
}) => {
    const { id, onFetchSuccess } = props;
    const [songDetail, setSongDetail] = useState<any>({})

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/song/detail/${id}`)
            .then(res => res.json())
            .then((data) => {
                setSongDetail(data.songDetail);
                onFetchSuccess(data.songDetail);
            })
    }, [])

    return (
        <>
            {songDetail && (
                <CardInfor
                    item={songDetail}
                />
            )}
        </>
    );
}