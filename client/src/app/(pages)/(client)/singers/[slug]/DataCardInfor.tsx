"use client"

import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { CardInforSkeleton } from "@/app/components/CardInfor/CardInforSekeleton";
import { useEffect, useState } from "react";

export const DataCardInfor = (props: {
    slug: string
}) => {
    const { slug } = props;

    const [singerDetail, setSingerDetail] = useState<any[]>(null)
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/singer/detail/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setSingerDetail(data.singerDetail);
            })
    }, [])

    return (
        <>
            {singerDetail ? (
                <CardInfor
                    item={singerDetail}
                />
            ) : (
                <CardInforSkeleton/>
            )}
        </>
    );
}