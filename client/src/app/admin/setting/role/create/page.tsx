import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Tạo nhóm quyền",
  description: "Quản trị App Nghe nhạc",
};

export default function RoleCreate() {
  return (
    <>
      <MainPage/>
    </>
  );
}