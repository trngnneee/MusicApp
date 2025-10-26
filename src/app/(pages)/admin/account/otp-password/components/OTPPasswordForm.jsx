"use client"

import { Button } from "@/components/ui/button"
import { Title } from "../../components/Title"
import Link from "next/link"
import { OTPInputComponent } from "../../components/OTPInput"
import { useEffect, useState } from "react"
import JustValidate from "just-validate"
import { adminAccountOTPPassword } from "@/lib/adminApi/account.api"
import { toastHandler } from "@/lib/toastHandler"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"

export const OTPPasswordForm = () => {
  const [otp, setOtp] = useState("")
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#otp-password-form');
    validation.addField('#otp-password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mã OTP',
      },
      {
        rule: 'customRegexp',
        value: /^[0-9]{6}$/,
        errorMessage: 'Mã OTP phải gồm 6 chữ số',
      },
    ], {
      errorsContainer: '#otp-error'
    })
      .onSuccess((event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const otp = formData.get("otp-password");

        const finalData = {
          email: email,
          otp: otp
        }

        const promise = adminAccountOTPPassword(finalData);
        toastHandler(promise, (promise) => {Cookies.set("adminToken", promise.token, { expires: 1 })}, router, "/admin/account/reset-password");
      });
  }, [])

  return (
    <form
      className="bg-white rounded-3xl py-[50px] px-[30px] sm:px-[57px] flex flex-col gap-5 w-[600px] shadow-md"
      id="otp-password-form"
    >
      <Title
        title="Xác thực OTP"
        desc="Nhập mã OTP đã gửi đến email của bạn"
      />

      <div className="flex justify-center">
        <OTPInputComponent
          otp={otp}
          setOtp={setOtp}
        />
      </div>
      <div id="otp-error" className="error-container text-[10px] text-center"></div>

      <Button
        className="group relative disabled:opacity-100 bg-[#4880FF] hover:bg-[#487fffd0] font-bold"
      >
        <span className="group-data-loading:text-transparent">Xác thực OTP</span>
      </Button>

      <div className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">
        <div>Bạn đã có tài khoản? <Link href="/admin/account/login" className="text-[#4880FF] underline">Đăng nhập</Link></div>
      </div>
    </form>
  )
}