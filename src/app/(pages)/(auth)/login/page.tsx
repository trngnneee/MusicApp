import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Nghe nhạc trực tuyến",
};

export default function LoginPage() {
  return (
    <>
      <div className="mt-[60px] mx-auto w-[500px]">
        <Title
          title="Đăng Nhập Tài Khoản"
          className="text-center"
        />
        <LoginForm/>
      </div>
    </>
  );
}
