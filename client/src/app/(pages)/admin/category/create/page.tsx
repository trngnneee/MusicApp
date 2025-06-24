import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Tạo danh mục",
  description: "Quản trị App Nghe nhạc",
};

export default function CategoryCreate() {
  return (
    <>
      <MainPage/>
    </>
  );
}