import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Nghe nhạc trực tuyến",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-bold text-[36px]">Trang đăng nhập</h1>
    </>
  );
}
