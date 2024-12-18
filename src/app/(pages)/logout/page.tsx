"use client"

import { authFireBase } from "@/app/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage(){
    const router = useRouter();

    useEffect(() => {
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