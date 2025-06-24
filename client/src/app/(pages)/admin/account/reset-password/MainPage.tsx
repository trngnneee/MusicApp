"use client"

import { useAuth } from "@/hooks/useAuth";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <div className="bg-[url('/Shape.png')] bg-cover bg-center min-h-screen min-w-full bg-no-repeat bg-[#4880FF] py-[50px]">
            <div className="bg-white w-[320px] sm:w-[500px] md:w-[630px] py-[90px] px-[30px] sm:px-[40px] md:px-[57px] rounded-[24px] mx-auto">
              <div className="text-center mb-[20px] md:mb-[40px]">
                <h1 className="font-[700] text-[24px] md:text-[32px] mb-[15px] text-dark">Đổi mật khẩu</h1>
                <div className="font-[600] text-[10px] sm:text-[12px] md:text-[18px] text-dark">Vui lòng nhập mật khẩu để tiếp tục</div>
              </div>
              <ResetPasswordForm />
            </div>
          </div>
        </>
      )}
    </>
  );
}