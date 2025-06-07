import { Title } from "@/app/components/Admin/Title/Title";
import { SingerEditForm } from "./SingerEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa ca sĩ",
  description: "Quản trị App Nghe nhạc",
};


export default function SingerEdit() { 
  return (
    <>
      <Title title={"Chỉnh sửa ca sĩ"} />
      <div className="mt-[30px]">
        <SingerEditForm/>
      </div>
    </>
  );
}