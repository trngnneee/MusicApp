import Link from "next/link";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <>
      <div className="bg-[url('/Shape.png')] bg-cover bg-center min-h-screen min-w-full bg-no-repeat bg-[#4880FF] py-[50px]">
        <div className="bg-white w-[630px] py-[90px] px-[57px] rounded-[24px] mx-auto">
          <div className="text-center mb-[40px]">
            <h1 className="font-[700] text-[32px] mb-[15px] text-dark">Đổi mật khẩu</h1>
            <div className="font-[600] text-[18px] text-dark">Vui lòng nhập mật khẩu để tiếp tục</div>
          </div>
          <ResetPasswordForm/>
          <div className="flex gap-[10px] items-center justify-center">
            <div className="font-[600] text-[18px] text-dark opacity-[0.65]">Bạn đã nhớ mật khẩu?</div>
            <Link href="/admin/login" className="font-[700] text-[18px] underline text-[#4880FF]">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </>
  );
}