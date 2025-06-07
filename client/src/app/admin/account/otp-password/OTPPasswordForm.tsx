"use client"

import JustValidate from 'just-validate';
import { useEffect } from 'react';

export const OTPPasswordForm = () => {
  useEffect(() => {
      const validation = new JustValidate('#otp-password-form');
  
      validation
        .addField('#otp', [
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
        ])
        .onSuccess((event) => {
          const otp = event.target.otp.value;
          
          console.log(otp);
        })
    }, [])
  
  return (
    <>
      <form className="mb-[30px]" id='otp-password-form'>
        <div className="flex flex-col mb-[15px] md:mb-[30px]">
          <label className="font-[600] text-[12px] md:text-[18px] text-dark mb-[8px] md:mb-[15px]" htmlFor="otp">Mã OTP</label>
          <input
            type="text"
            id="otp"
            placeholder="Ví dụ: 123456"
            className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[12px] md:text-[18px] font-[600] text-[#A6A6A6]"
          />
        </div>
        <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[15px] md:text-[20px] text-white">
          Xác thực
        </button>
      </form>
    </>
  );
}