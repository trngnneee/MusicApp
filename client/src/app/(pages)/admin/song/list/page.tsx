import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Quản lý bài hát",
  description: "Quản trị App Nghe nhạc",
};

export default function Song() {
  return (
    <>
      <MainPage/>
    </>
  );
}