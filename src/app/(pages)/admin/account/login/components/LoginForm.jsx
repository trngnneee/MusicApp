"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Title } from "../../components/Title";
import { EmailInput } from "../../components/EmailInput";
import { PasswordInput } from "../../components/PasswordInput";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import JustValidate from "just-validate";
import { adminAccountLogin } from "@/lib/adminApi/account.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toastHandler } from "@/lib/toastHandler";
import Cookies from "js-cookie";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#login-form');
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
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập mật khẩu',
        },
        {
          rule: 'customRegexp',
          value: /.{8,}/,
          errorMessage: 'Mật khẩu phải có ít nhất 8 ký tự',
        },
        {
          rule: 'customRegexp',
          value: /[0-9]/,
          errorMessage: 'Mật khẩu phải có ít nhất 1 chữ số',
        },
        {
          rule: 'customRegexp',
          value: /[a-z]/,
          errorMessage: 'Mật khẩu phải có ít nhất 1 chữ viết thường',
        },
        {
          rule: 'customRegexp',
          value: /[A-Z]/,
          errorMessage: 'Mật khẩu phải có ít nhất 1 chữ viết hoa',
        },
        {
          rule: 'customRegexp',
          value: /[^A-Za-z0-9]/,
          errorMessage: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
        },
      ], {
        errorsContainer: '#password-error'
      })
      .onSuccess((event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get("email");
        const password = formData.get("password");

        const finalData = {
          email,
          password,
          rememberPassword: rememberMe,
        };

        const promise = adminAccountLogin(finalData);

        toastHandler(promise, (promise) => {Cookies.set("adminToken", promise.token, { expires: 1 })}, router, "/admin/category");
      });
  }, [])

  return (
    <form
      className="bg-white rounded-3xl py-[50px] px-[30px] sm:px-[57px] flex flex-col gap-5 w-[600px] shadow-md"
      id="login-form"
    >
      <Title
        title="Đăng nhập"
        desc="Nhập thông tin tài khoản của bạn"
      />

      <EmailInput
        email={email}
        setEmail={setEmail}
      />
      <div id="email-error" className="error-container text-[10px] mt-[-15px]"></div>

      <PasswordInput
        password={password}
        setPassword={setPassword}
        allowCheck={false}
      />
      <div id="password-error" className="error-container text-[10px] mt-[-15px]"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          <Label htmlFor="remember" className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">Nhớ mật khẩu</Label>
        </div>

        <div>
          <div className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">
            <Link href="/admin/account/forgot-password" className="hover:underline">Quên mật khẩu?</Link>
          </div>
        </div>
      </div>

      <Button
        className="group relative disabled:opacity-100 bg-[#4880FF] hover:bg-[#487fffd0] font-bold"
      >
        <span className="group-data-loading:text-transparent">Đăng nhập</span>
      </Button>

      <div className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">
        <div>Bạn chưa có tài khoản? <Link href="/admin/account/register" className="text-[#4880FF] underline">Đăng ký</Link></div>
      </div>
    </form>
  )
}