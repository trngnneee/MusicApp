import { Title } from "@/app/components/Admin/Title/Title";
import { SongEditForm } from "./SongEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa bài hát",
  description: "Quản trị App Nghe nhạc",
};

export default function SongEdit() {
  return (
    <>
      <Title title={"Chỉnh sửa bài hát"} />
      <div className="mt-[30px]">
        <SongEditForm/>
      </div>
    </>
  );
}