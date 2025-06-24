import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Thùng rác người dùng",
  description: "Quản trị App Nghe nhạc",
};

export default function UserTrash() {
  return (
    <>
      <MainPage/>
    </>
  );
}