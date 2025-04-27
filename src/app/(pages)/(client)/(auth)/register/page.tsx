import { Title } from "@/app/components/client/Title/Title";
import { Metadata } from "next";
import { RegisterForm } from "./FormRegister";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mt-[60px] mx-auto w-[300px] sm:w-[500px]">
        <Title
          title="Đăng Ký Tài Khoản"
          className="text-center"
        />
        <RegisterForm/>
      </div>
    </>
  );
}