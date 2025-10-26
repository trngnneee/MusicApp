"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PasswordInput } from "../../components/PasswordInput";
import { EmailInput } from "../../components/EmailInput";
import { FullNameInput } from "../../components/FullNameInput";
import JustValidate from "just-validate";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Title } from "../../components/Title";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminAccountRegister } from "@/lib/adminApi/account.api";
import { toastHandler } from "@/lib/toastHandler";

export const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#register-form');
    validation.addField('#full-name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên',
      },
    ], {
      errorsContainer: '#fullName-error'
    })
      .addField('#email', [
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
      .addField('#terms', [
        {
          validator: () => {
            const checkbox = document.querySelector('#terms');
            return checkbox && checkbox.getAttribute('data-state') === 'checked';
          },
          errorMessage: 'Bạn phải đồng ý với các điều khoản',
        },
      ], {
        errorsContainer: '#terms-error'
      })
      .onSuccess(async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get("email");
        const fullName = formData.get("full-name");
        const password = formData.get("password");

        const finalData = {
          email,
          fullName,
          password
        };

        const promise = adminAccountRegister(finalData);

        toastHandler(promise, null, router, "/admin/account/login");
      });
  }, [])

  return (
    <>
      <form
        className="bg-white rounded-3xl py-[50px] px-[30px] sm:px-[57px] flex flex-col gap-5 w-[600px] shadow-md"
        id="register-form"
      >
        <Title
          title="Đăng ký"
          desc="Tạo một tài khoản để tiếp tục"
        />

        <FullNameInput
          fullName={fullName}
          setFullName={setFullName}
        />
        <div id="fullName-error" className="error-container text-[10px] mt-[-15px]"></div>

        <EmailInput
          email={email}
          setEmail={setEmail}
        />
        <div id="email-error" className="error-container text-[10px] mt-[-15px]"></div>

        <PasswordInput
          password={password}
          setPassword={setPassword}
        />
        <div id="password-error" className="error-container text-[10px] hidden"></div>

        <div className="flex items-center gap-2">
          <Checkbox id="terms" defaultChecked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
          <Label htmlFor="terms" className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">Tôi đồng ý với các điều khoản</Label>
        </div>
        <div id="terms-error" className="error-container text-[10px] mt-[-15px]"></div>

        <Button
          className="group relative disabled:opacity-100 bg-[#4880FF] hover:bg-[#487fffd0] font-bold"
        >
          <span className="group-data-loading:text-transparent">Đăng ký</span>
        </Button>

        <div className="text-center text-[#202224] opacity-[0.8] text-[14px] font-medium">
          <div>Bạn đã có tài khoản? <Link href="/admin/account/login" className="text-[#4880FF] underline">Đăng nhập</Link></div>
        </div>
      </form>
    </>
  );
}