import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Tạo tài khoản quản trị",
  description: "Quản trị App Nghe nhạc",
};

export default function AdminAccountCreate() {
  return (
    <>
      <MainPage/>
    </>
  );
}