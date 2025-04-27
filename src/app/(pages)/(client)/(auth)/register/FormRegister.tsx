"use client"

import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export const RegisterForm = () => {
    const router = useRouter();
    const [view, setView] = useState(false);
    const [view2, setView2] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const fullName = event.target.fullName.value;
        const email = event.target.email.value
        const password = event.target.password.value;
        const confirmPass = event.target.confirmPass.value;

        if (!fullName || !email || !password || !confirmPass)
        {
            Swal.fire({
                title: "Vui Lòng Điền Đủ Thông Tin!",
                icon: "error",
            });
        }
        else if (password.length < 7)
        {
            Swal.fire({
                title: "Độ dài mật khẩu phải lớn hơn 7 kí tự!",
                icon: "error",
            });
        }
        else if (password != confirmPass) {
            Swal.fire({
                title: "Mật Khẩu Không Trùng!",
                icon: "error",
            });
        }
        else if (fullName && email && password && password == confirmPass) {
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
                    Swal.fire({
                        title: "Email Đã Được Sử Dụng",
                        icon: "error",
                    });
                });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleViewPassword = (event: any) => {
        event.preventDefault();
        setView(!view);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleViewPassword2 = (event: any) => {
        event.preventDefault();
        setView2(!view2);
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
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[300px] sm:w-[500px]"
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
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[300px] sm:w-[500px]"
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
                    <div className="flex w-[300px] sm:w-[500px] px-[16px] py-[14px] rounded-[6px] bg-white">
                        <input
                            type={view ? "text" : "password"}
                            name="password"
                            id="password"
                            className="outline-none w-full"
                        />
                        <button
                            type="button"
                            onClick={handleViewPassword}
                        >
                            {view ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                </div>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="confirmPass"
                    >
                        <div className="text-[14px] font-[600] text-white">Xác Nhận Mật Khẩu</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <div className="flex w-[300px] sm:w-[500px] px-[16px] py-[14px] rounded-[6px] bg-white">
                        <input
                            type={view2 ? "text" : "password"}
                            name="confirmPass"
                            id="confirmPass"
                            className="outline-none w-full"
                        />
                        <button
                            type="button"
                            onClick={handleViewPassword2}
                        >
                            {view2 ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                </div>
                <button className="bg-[#00ADEF] w-[300px] sm:w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Đăng Kí</button>
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