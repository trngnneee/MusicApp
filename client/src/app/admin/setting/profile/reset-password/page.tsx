import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Đổi mật khẩu",
  description: "Quản trị App Nghe nhạc",
};

export default function ProfileResetPassword() {
  return (
    <>
      <MainPage/>
    </>
  );
}