import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Chỉnh sửa thông tin cá nhân",
  description: "Quản trị App Nghe nhạc",
};

export default function ProfileEdit() {
  return (
    <>
      <MainPage/>
    </>
  );
}