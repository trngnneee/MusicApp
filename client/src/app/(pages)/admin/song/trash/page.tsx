import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Thùng rác bài hát",
  description: "Quản trị App Nghe nhạc",
};

export default function SongTrash() {
  return (
    <>
      <MainPage/>
    </>
  );
}