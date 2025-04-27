"use client"

import JustValidate from 'just-validate';
import { useEffect } from 'react';

export const RegisterForm = () => {
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
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Email bắt buộc!'
        },
        {
          rule: 'email',
          errorMessage: 'Email sai định dạng!',
        },
      ])
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
      ])
      .addField('#agree', [
        {
          rule: 'required',
          errorMessage: 'Bạn phải đồng ý với các điều khoản và điều kiện!'
        }
      ], {
        errorsContainer: '#terms-error'
      })
      .onSuccess((event) => {
        const fullName = event.target.fullName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(fullName);
        console.log(email);
        console.log(password);
      })
  }, [])

  return (
    <>
      <form className="mb-[30px]" id="register-form">
        <div className="flex flex-col mb-[30px]">
          <label className="font-[600] text-[18px] text-dark mb-[15px]" htmlFor="fullName">Họ tên</label>
          <input
            type="text"
            id="fullName"
            placeholder="Ví dụ: Lê Văn A"
            className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[18px] font-[600] text-[#A6A6A6]"
          />
        </div>
        <div className="flex flex-col mb-[30px]">
          <label className="font-[600] text-[18px] text-dark mb-[15px]" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ví dụ: levana@gmail.com"
            className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[18px] font-[600] text-[#A6A6A6]"
          />
        </div>
        <div className="mb-[30px]">
          <label className="font-[600] text-[18px] text-dark mb-[15px]" htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[18px] font-[600] text-[#A6A6A6]"
          />
        </div>
        <div className="flex items-center gap-[12px]">
          <input
            type="checkbox"
            id="agree"
            className="w-[24px] h-[24px] rounded-[5px] border-[0.6px] border-[#A3A3A3]"
          />
          <label htmlFor="agree" className="font-[600] text-[18px] text-dark opacity-[0.6]">Tôi chấp nhận các điều khoản và điều kiện</label>
        </div>
        <div id="terms-error" className="error-message mb-[30px] mt-[5px]"></div>
        <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[20px] text-white">
          Đăng Ký
        </button>
      </form>
    </>
  );
}