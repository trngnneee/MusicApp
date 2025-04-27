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
      <div className="bg-[url('/Shape.png')] bg-cover bg-center min-h-[100%] bg-[#4880FF] py-[50px]">
        <div className="bg-white w-[630px] py-[90px] px-[57px] rounded-[24px] mx-auto">
          <div className="text-center mb-[40px]">
            <h1 className="font-[700] text-[32px] mb-[15px] text-dark">Đăng nhập</h1>
            <div className="font-[600] text-[18px] text-dark">Vui lòng nhập email và mật khẩu để tiếp tục</div>
          </div>
          <LoginForm/>
          <div className="flex gap-[10px] items-center justify-center">
            <div className="font-[600] text-[18px] text-dark opacity-[0.65]">Bạn chưa có tài khoản?</div>
            <Link href="/admin/register" className="font-[700] text-[18px] underline text-[#4880FF]">Tạo tài khoản</Link>
          </div>
        </div>
      </div>
    </>
  );
}