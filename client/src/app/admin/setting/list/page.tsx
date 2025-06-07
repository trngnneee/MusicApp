import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Cài đặt chung",
  description: "Quản trị App Nghe nhạc",
};

export default function Setting() {
  return (
    <>
      <MainPage/>
    </>
  );
}