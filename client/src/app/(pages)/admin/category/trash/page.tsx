import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Thùng rác danh mục",
  description: "Quản trị App Nghe nhạc",
};

export default function CategoryTrash() {
  return (
    <>
      <MainPage/>
    </>
  );
}