import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mt-[60px] mx-auto w-[300px] sm:w-[500px]">
        <Title
          title="Quên mật khẩu"
          className="text-center"
        />
        <ForgotPasswordForm/>
      </div>
    </>
  );
}