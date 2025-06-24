"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import 'sweetalert2/src/sweetalert2.scss'

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then((data) => {
                router.push("/");
                return data;
            })

        toast.promise(promise, {
            loading: "Đang xử lý...",
            success: (data) => data.message,
            error: (data) => data.message,
        })
    }, [])

    return (
        <>

        </>
    );
}