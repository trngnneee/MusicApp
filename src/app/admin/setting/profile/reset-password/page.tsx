import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Đổi mật khẩu",
  description: "Quản trị App Nghe nhạc",
};

export default function ProfileResetPassword() {
  return (
    <>
      <Title title={"Thông tin cá nhân"} />
      <div className="mt-[30px]">
        <ResetPasswordForm/>
      </div>
    </>
  );
}