"use client"

import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import 'sweetalert2/src/sweetalert2.scss'

export const HeartButton = (props: {
    item: any,
    api: string,
    wishlist: string[]
    onClickSuccess?: (id: string) => void
}) => {
    const { item, api, wishlist, onClickSuccess } = props;
    const [isActive, setIsActive] = useState(wishlist.includes(item.id));

    const handleClick = () => {
        const promise = fetch(api, {
            method: "PATCH",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });

        toast.promise(promise, {
            loading: "Đang xử lý...",
            success: (data) => {
                if (data.code == "success") {
                    if (data.successCode == 0) setIsActive(false);
                    else setIsActive(true);
                    onClickSuccess(item.id);
                };
                return data.message;
            },
            error: (data) => data.message
        })
    }

    return (
        <>
            <button
                className="text-[white] rounded-[50%] border-[1px] md:border-[2px] border-[white] hover:bg-[#9d9c9c43] p-[5px] sm:p-[10px] text-[15px]"
                onClick={handleClick}
            >
                {(isActive) ? (<div className="text-[#00ADEF]"><FaHeart /></div>) : (<FaRegHeart />)}
            </button>
        </>
    );
}