import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Quản lý nhóm quyền",
  description: "Quản trị App Nghe nhạc",
};

export default function RoleList() {
  return (
    <>
      <MainPage/>
    </>
  );
}