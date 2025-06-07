import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Quản lý người dùng",
  description: "Quản trị App Nghe nhạc",
};

export default function UserList() {
  return (
    <>
      <MainPage/>
    </>
  );
}