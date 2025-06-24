"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import JustValidate from 'just-validate';

export const LoginForm = () => {
    const router = useRouter();
    const [view, setView] = useState(false);

    useEffect(() => {
        const validation = new JustValidate('#login-form');

        validation
            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Email bắt buộc!'
                },
                {
                    rule: 'email',
                    errorMessage: 'Email sai định dạng!',
                },
            ], {
                errorsContainer: '#email-container'
            })
            .addField('#password', [
                {
                    rule: 'required',
                    errorMessage: 'Vui lòng nhập mật khẩu!',
                },
                {
                    validator: (value) => value.length >= 8,
                    errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
                },
                {
                    validator: (value) => /[A-Z]/.test(value),
                    errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
                },
                {
                    validator: (value) => /[a-z]/.test(value),
                    errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
                },
                {
                    validator: (value) => /\d/.test(value),
                    errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
                },
                {
                    validator: (value) => /[@$!%*?&]/.test(value),
                    errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
                },
            ], {
                errorsContainer: '#password-container'
            })
            .onSuccess((event) => {
                event.preventDefault();
                const email = event.target.email.value
                const password = event.target.password.value;
                const rememberPassword = event.target.rememberPassword.checked;

                const finalData = {
                    email: email,
                    password: password,
                    rememberPassword: rememberPassword
                };

                const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(finalData),
                    credentials: "include"
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })

                toast.promise(promise, {
                    loading: "Đang xử lý...",
                    success: (data) => {
                        if (data.code == "success")
                        {
                            router.push("/");
                        }
                        return data.message
                    },
                    error: (data) => data.message
                })
            })
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleViewPassword = (event: any) => {
        event.preventDefault();
        setView(!view);
    }

    return (
        <>
            <form id="login-form">
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
                <div className="mb-[15px] text-[12px]" id="email-container"></div>
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
                <div className="mb-[15px] text-[12px]" id="password-container"></div>
                <div className="mb-[20px] flex justify-between">
                    <div className="flex items-center gap-[10px]">
                        <input name="rememberPassword" id="rememberPassword" type="checkbox" className="w-[15px] h-[15px] cursor-pointer" />
                        <label htmlFor="rememberPassword" className="text-white text-[14px]">Nhớ mật khẩu</label>
                    </div>
                    <div>
                        <Link href="forgot-password" className="text-white text-[14px] hover:text-[#00ADEF] cursor-pointer">Quên mật khẩu?</Link>
                    </div>
                </div>
                <button className="bg-[#00ADEF] w-[300px] sm:w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Đăng nhập</button>
                <div className="mt-[10px] flex text-white gap-[8px] justify-end items-center">
                    <div className="">Chưa có tài khoản?</div>
                    <Link href="/register">
                        <u className="hover:text-[#00ADEF]">Đăng ký</u>
                    </Link>
                </div>
            </form>
        </>
    );
}