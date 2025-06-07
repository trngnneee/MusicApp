import { Metadata } from "next";
import { MainPage } from "./MainPage";

export const metadata: Metadata = {
  title: "Thông tin website",
  description: "Quản trị App Nghe nhạc",
};

export default function WebsiteEdit() {
  return (
    <>
      <MainPage/>
    </>
  );
}