"use client"

import JustValidate from 'just-validate';
import { useEffect } from 'react';

export const ForgotPasswordForm = () => {
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
      ])
      .onSuccess((event) => {
        const email = event.target.email.value;

        console.log(email);
      })
  }, [])

  return (
    <>
      <form className="mb-[30px]" id='forgot-password-form'>
        <div className="flex flex-col mb-[30px]">
          <label className="font-[600] text-[18px] text-dark mb-[15px]" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ví dụ: levana@gmail.com"
            className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[18px] font-[600] text-[#A6A6A6]"
          />
        </div>
        <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[20px] text-white">
          Gửi mã OTP
        </button>
      </form>
    </>
  );
}