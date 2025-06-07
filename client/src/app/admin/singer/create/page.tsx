import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Thêm ca sĩ",
  description: "Quản trị App Nghe nhạc",
};

export default function SingerCreate() {
  return (
    <>
      <MainPage/>
    </>
  );
}