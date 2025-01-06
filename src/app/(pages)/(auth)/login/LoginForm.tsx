"use client"

import { authFireBase } from "@/app/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const LoginForm = () => {
    const router = useRouter();

    const handleLogin = (event: any) => {
        event.preventDefault();
        const email = event.target.email.value
        const password = event.target.password.value;
        signInWithEmailAndPassword(authFireBase, email, password).then(() => {
            router.push("/");
            Swal.fire({
                title: "Đăng nhập thành công!",
                icon: "success",
            });
        })
    }

    return (
        <>
            <form onSubmit={handleLogin}>
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
                    <div className="">Chưa có tài khoản?</div>
                    <Link href="/register">
                        <u>Đăng ký</u>
                    </Link>
                </div>
            </form>
        </>
    );
}