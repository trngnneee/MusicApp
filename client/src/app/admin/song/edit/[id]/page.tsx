import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Chỉnh sửa bài hát",
  description: "Quản trị App Nghe nhạc",
};

export default function SongEdit() {
  return (
    <>
      <MainPage/>
    </>
  );
}