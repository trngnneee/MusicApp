"use client"

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import JustValidate from 'just-validate';
import { useRouter, useSearchParams } from "next/navigation";


export const OTPPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const validation = new JustValidate('#otp-password-form');

    validation
      .addField('#otpPassword', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập OTP!'
        },
        {
          rule: 'minLength',
          value: 6,
          errorMessage: 'OTP phải có ít nhất 6 ký tự!',
        },
        {
          rule: 'maxLength',
          value: 6,
          errorMessage: 'OTP phải không được vượt quá 6 ký tự!',
        },
      ], {
        errorsContainer: '#email-container'
      })
      .onSuccess((event) => {
        event.preventDefault();
        const email = searchParams.get("email");
        const otp = event.target.otpPassword.value;

        const finalData = {
          email: email,
          otp: otp
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/otp-password`, {
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
              router.push("/reset-password");
            }
            return data.message
          },
          error: (data) => data.message
        })
      })
  }, [])

  return (
    <>
      <form id="otp-password-form">
        <div className="mb-[15px]">
          <label
            className="flex gap-[5px] mb-[5px]"
            htmlFor="otpPassword"
          >
            <div className="text-[14px] font-[600] text-white">OTP</div>
            <div className="text-[red]">*</div>
          </label>
          <input
            type="text"
            name="otpPassword"
            id="otpPassword"
            placeholder="Ví dụ: 123456"
            className="px-[16px] py-[14px] rounded-[6px] outline-none w-[300px] sm:w-[500px]"
          />
        </div>
        <div className="mb-[15px] text-[12px]" id="email-container"></div>
        <button className="bg-[#00ADEF] w-[300px] sm:w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Kiểm tra OTP</button>
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