"use client"

import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const RegisterForm = () => {
    const router = useRouter();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const fullName = event.target.fullName.value;
        const email = event.target.email.value
        const password = event.target.password.value;

        if (fullName && email && password) {
            createUserWithEmailAndPassword(authFireBase, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        set(ref(dbFirebase, `users/${user.uid}`), {
                            fullName: fullName
                        }).then(() => {
                            Swal.fire({
                                title: "Đăng kí thành công!",
                                icon: "success",
                            });
                            router.push("/");
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else{
            Swal.fire({
                title: "Email Đã Được Sử Dụng",
                icon: "error",
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="fullName"
                    >
                        <div className="text-[14px] font-[600] text-white">Họ Tên</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Ví dụ: Le Van A"
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
                    />
                </div>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="email"
                    >
                        <div className="text-[14px] font-[600] text-white">Email</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ví dụ: levana@gmail.com"
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
                    />
                </div>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="password"
                    >
                        <div className="text-[14px] font-[600] text-white">Mật Khẩu</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
                    />
                </div>
                <button className="bg-[#00ADEF] w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Đăng nhập</button>
                <div className="mt-[10px] flex text-white gap-[8px] justify-end items-center">
                    <div className="">Đã có tài khoản?</div>
                    <Link href="/login">
                        <u>Đăng nhập</u>
                    </Link>
                </div>
            </form>
        </>
    );
}