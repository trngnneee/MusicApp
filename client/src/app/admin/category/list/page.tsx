import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Quản lý danh mục",
  description: "Quản trị App Nghe nhạc",
};

export default function Category() {
  return (
      <MainPage/>
  );
}