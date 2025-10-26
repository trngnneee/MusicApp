"use client"

import { Button } from "@/components/ui/button"
import { EmailInput } from "../../components/EmailInput"
import { Title } from "../../components/Title"
import { useEffect, useState } from "react"
import Link from "next/link"
import JustValidate from "just-validate"
import { adminAccountForgotPassword } from "@/lib/adminApi/account.api"
import { toastHandler } from "@/lib/toastHandler"
import { useRouter } from "next/navigation"

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("")
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#forgot-password-form');
    validation.addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email',
      },
      {
        rule: 'email',
        errorMessage: 'Vui lòng nhập email hợp lệ',
      },
    ], {
      errorsContainer: '#email-error'
    })
      .onSuccess((event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get("email");

        const finalData = {
          email: email,
        };

        const promise = adminAccountForgotPassword(finalData);

        toastHandler(promise, null, router, `/admin/account/otp-password?email=${email}`);
      });
  }, [])

  return (
    <form
      className="bg-white rounded-3xl py-[50px] px-[30px] sm:px-[57px] flex flex-col gap-5 w-[600px] shadow-md"
      id="forgot-password-form"
    >
      <Title
        title="Quên mật khẩu"
        desc="Nhập thông tin email của bạn"
      />

      <EmailInput
        email={email}
        setEmail={setEmail}
      />
      <div id="email-error" className="error-container text-[10px] mt-[-15px]"></div>


      <Button
        className="group relative disabled:opacity-100 bg-[#4880FF] hover:bg-[#487fffd0] font-bold"
      >
        <span className="group-data-loading:text-transparent">Gửi mã OTP</span>
      </Button>

      <div className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">
        <div>Bạn đã có tài khoản? <Link href="/admin/account/login" className="text-[#4880FF] underline">Đăng nhập</Link></div>
      </div>
    </form>
  )
}