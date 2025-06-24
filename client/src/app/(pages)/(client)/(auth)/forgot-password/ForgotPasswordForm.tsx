"use client"

import { useEffect } from "react";
import { toast } from "sonner";
import JustValidate from 'just-validate';
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#forgot-password-form');

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
      .onSuccess((event) => {
        event.preventDefault();
        const email = event.target.email.value

        const finalData = {
          email: email,
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(finalData),
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
              router.push(`/otp-password?email=${email}`);
            }
            return data.message
          },
          error: (data) => data.message
        })
      })
  }, [])

  return (
    <>
      <form id="forgot-password-form">
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
        <button className="bg-[#00ADEF] w-[300px] sm:w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Gửi OTP</button>
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