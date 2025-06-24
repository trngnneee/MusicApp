import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Quản lý tài khoản quản trị",
  description: "Quản trị App Nghe nhạc",
};

export default function AdminAccountList() {
  return (
    <>
      <MainPage/>
    </>
  );
}