import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Tạo bài hát",
  description: "Quản trị App Nghe nhạc",
};

export default function SongCreate() {
  return (
    <>
      <MainPage/>
    </>
  );
}