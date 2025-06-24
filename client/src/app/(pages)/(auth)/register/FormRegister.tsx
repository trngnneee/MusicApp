"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import JustValidate from 'just-validate';
import { toast, Toaster } from "sonner";

export const RegisterForm = () => {
    const router = useRouter();
    const [view, setView] = useState(false);
    const [view2, setView2] = useState(false);

    useEffect(() => {
        const validation = new JustValidate('#register-form');

        validation
            .addField('#fullName', [
                {
                    rule: 'required',
                    errorMessage: 'Vui lòng nhập họ tên!'
                },
                {
                    rule: 'minLength',
                    value: 5,
                    errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
                },
            ], {
                errorsContainer: '#fullName-container'
            })
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
            .addField('#confirmPass', [
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
                {
                    validator: (value, fields) => {
                        const password = fields['#password'].elem.value;
                        return value == password;
                    },
                    errorMessage: 'Mật khẩu xác nhận không khớp!',
                }
            ], {
                errorsContainer: '#confirmPass-container'
            })
            .onSuccess((event => {
                event.preventDefault();
                const fullName = event.target.fullName.value;
                const email = event.target.email.value
                const password = event.target.password.value;
                const confirmPass = event.target.confirmPass.value;

                const finalData = {
                    fullName: fullName, 
                    email: email,
                    password: password
                };

                const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(finalData)
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
                            router.push("/login");
                        }
                        return data.message
                    },
                    error: (data) => data.message
                })
            }))
    }, [])

    const handleViewPassword = (event: any) => {
        event.preventDefault();
        setView(!view);
    }
    const handleViewPassword2 = (event: any) => {
        event.preventDefault();
        setView2(!view2);
    }

    return (
        <>
            <Toaster/>
            <form id="register-form">
                <div className="">
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
                <div className="mb-[15px] text-[12px]" id="fullName-container"></div>
                <div>
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
                <div>
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
                <div>
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
                <div className="mb-[15px] text-[12px]" id="confirmPass-container"></div>
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