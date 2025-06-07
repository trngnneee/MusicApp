import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Quản lý ca sĩ",
  description: "Quản trị App Nghe nhạc",
};

export default function Singer() {
  return (
    <>
      <MainPage/>
    </>
  );
}