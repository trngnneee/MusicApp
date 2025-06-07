import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Chỉnh sửa danh mục",
  description: "Quản trị App Nghe nhạc",
};

export default function CategoryEdit() {
  return (
    <>
      <MainPage/>
    </>
  );
}