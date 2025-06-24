import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Thùng rác ca sĩ",
  description: "Quản trị App Nghe nhạc",
};

export default function SingerTrash() {
  return (
    <>
      <MainPage/>
    </>
  );
}