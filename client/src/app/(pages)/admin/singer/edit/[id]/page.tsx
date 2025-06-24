import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Chỉnh sửa ca sĩ",
  description: "Quản trị App Nghe nhạc",
};


export default function SingerEdit() { 
  return (
    <>
      <MainPage/>
    </>
  );
}