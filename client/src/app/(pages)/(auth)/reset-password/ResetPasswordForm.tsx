"use client"

import { userUseAuth } from "@/hooks/userUseAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import JustValidate from 'just-validate';

export const ResetPasswordForm = () => {
  const { isLogin } = userUseAuth();
  const router = useRouter();
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);

  const handleViewPassword = (event: any) => {
    event.preventDefault();
    setView(!view);
  }

  const handleViewPassword2= (event: any) => {
    event.preventDefault();
    setView2(!view2);
  }

  useEffect(() => {
    if (!isLogin) return;

    const validation = new JustValidate('#reset-password-form');

    validation
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
      .addField('#confirmPassword', [
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
        errorsContainer: '#confirm-password-container'
      })
      .onSuccess((event) => {
        event.preventDefault();
        const password = event.target.password.value;

        const finalData = {
          password: password
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/reset-password`, {
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
  }, [isLogin])

  return (
    <>
      {isLogin && (
        <form id="reset-password-form">
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
          <div className="mb-[15px]">
            <label
              className="flex gap-[5px] mb-[5px]"
              htmlFor="confirmPassword"
            >
              <div className="text-[14px] font-[600] text-white">Xác nhận mật Khẩu</div>
              <div className="text-[red]">*</div>
            </label>
            <div className="flex w-[300px] sm:w-[500px] px-[16px] py-[14px] rounded-[6px] bg-white">
              <input
                type={view2 ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
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
          <div className="mb-[15px] text-[12px]" id="confirm-password-container"></div>
          <button className="bg-[#00ADEF] w-[300px] sm:w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Đặt lại mật khẩu</button>
        </form>
      )}
    </>
  );
}