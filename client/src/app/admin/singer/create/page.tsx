import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { SingerCreateForm } from "./SingerCreateForm";

export const metadata: Metadata = {
  title: "Thêm ca sĩ",
  description: "Quản trị App Nghe nhạc",
};

export default function SingerCreate() {
  return (
    <>
      <Title title={"Thêm ca sĩ"} />
      <div className="mt-[30px]">
        <SingerCreateForm/>
      </div>
    </>
  );
}