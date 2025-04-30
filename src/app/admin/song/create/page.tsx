import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { SongCreateForm } from "./SongCreateForm";

export const metadata: Metadata = {
  title: "Tạo bài hát",
  description: "Quản trị App Nghe nhạc",
};

export default function SongCreate() {
  return (
    <>
      <Title title={"Tạo bài hát"} />
      <div className="mt-[30px]">
          <SongCreateForm/>
      </div>
    </>
  );
}