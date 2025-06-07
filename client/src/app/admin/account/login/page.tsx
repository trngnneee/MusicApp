import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng Nhập",
  description: "Quản trị App Nghe nhạc",
};

export default function Login() {
  return (
    <>
      <div className="bg-[url('/Shape.png')] bg-cover bg-center min-h-screen min-w-full bg-[#4880FF] py-[50px]">
        <div className="bg-white w-[320px] sm:w-[500px] md:w-[630px] py-[90px] px-[30px] sm:px-[40px] md:px-[57px] rounded-[24px] mx-auto">
          <div className="text-center mb-[20px] md:mb-[40px]">
            <h1 className="font-[700] text-[24px] md:text-[32px] mb-[15px] text-dark">Đăng nhập</h1>
            <div className="font-[600] text-[10px] sm:text-[12px] md:text-[18px] text-dark">Vui lòng nhập email và mật khẩu để tiếp tục</div>
          </div>
          <LoginForm/>
          <div className="flex gap-[10px] items-center justify-center">
            <div className="font-[600] text-[12px] md:text-[18px] text-dark opacity-[0.65]">Bạn chưa có tài khoản?</div>
            <Link href="/admin/account/register" className="font-[700] text-[12px] md:text-[18px] underline text-[#4880FF]">Tạo tài khoản</Link>
          </div>
        </div>
      </div>
    </>
  );
}