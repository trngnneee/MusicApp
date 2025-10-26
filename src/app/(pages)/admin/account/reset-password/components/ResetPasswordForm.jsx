"use client"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "../../components/PasswordInput"
import { Title } from "../../components/Title"
import { useEffect, useState } from "react"
import JustValidate from "just-validate"
import { Input } from "@/components/ui/input"
import { adminAccountResetPassword } from "@/lib/adminApi/account.api"
import { toastHandler } from "@/lib/toastHandler"
import { useRouter } from "next/navigation"
import useAdminAuth from "@/hooks/useAdminAuth"

export const ResetPasswordForm = () => {
  const { isLogin } = useAdminAuth();
  if (!isLogin) return null;

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#reset-password-form');
    validation.addField('#password', [
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
      .addField('#confirm-password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập xác nhận mật khẩu',
        },
        {
          validator: (value) => {
            const pwd = document.querySelector('#password')?.value || "";
            return value === pwd;
          },
          errorMessage: 'Mật khẩu xác nhận không khớp',
        },
      ], {
        errorsContainer: '#confirm-password-error'
      })
      .onSuccess((event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get("password");

        const finalData = {
          password: password,
        };

        const promise = adminAccountResetPassword(finalData);
        toastHandler(promise, null, router, "/admin/category");
      });
  }, [])

  return (
    <form
      className="bg-white rounded-3xl py-[50px] px-[30px] sm:px-[57px] flex flex-col gap-5 w-[600px] shadow-md"
      id="reset-password-form"
    >
      <Title
        title="Đặt lại mật khẩu"
        desc="Nhập thông tin mật khẩu của bạn"
      />

      <PasswordInput
        password={password}
        setPassword={setPassword}
      />
      <div id="password-error" className="error-container text-[10px] mt-[-15px]"></div>

      <Input
        id="confirm-password"
        name="confirm-password"
        className="pe-9"
        placeholder="Xác nhận mật khẩu"
        defaultValue={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
      />
      <div id="confirm-password-error" className="error-container text-[10px] mt-[-15px]"></div>


      <Button
        className="group relative disabled:opacity-100 bg-[#4880FF] hover:bg-[#487fffd0] font-bold"
      >
        <span className="group-data-loading:text-transparent">Đặt lại mật khẩu</span>
      </Button>
    </form>
  )
}