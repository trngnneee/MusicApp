import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Chỉnh sửa tài khoản quản trị",
  description: "Quản trị App Nghe nhạc",
};

export default function AdminAccountEdit() {
  return (
    <>
      <MainPage/>
    </>
  );
}