import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Chỉnh sửa thông tin người dùng",
  description: "Quản trị App Nghe nhạc",
};

export default function UserEdit() {
  return (
    <>
      <MainPage/>
    </>
  );
}