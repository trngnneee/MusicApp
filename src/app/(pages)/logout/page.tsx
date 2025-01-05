"use client"

import { authFireBase } from "@/app/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        Swal.fire({
            title: "Đăng xuất thành công!",
            icon: "success",
        });
        router.push("/login");
        signOut(authFireBase).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>

        </>
    );
}