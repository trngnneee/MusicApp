import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm"

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu",
  description: "Nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mt-[60px] mx-auto w-[300px] sm:w-[500px]">
        <Title
          title="Đặt lại mật khẩu"
          className="text-center"
        />
        <ResetPasswordForm/>
      </div>
    </>
  );
}