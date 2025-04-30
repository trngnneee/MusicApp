import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { WebsiteEditForm } from "./WebsiteEditForm";

export const metadata: Metadata = {
  title: "Thông tin website",
  description: "Quản trị App Nghe nhạc",
};

export default function WebsiteEdit() {
  return (
    <>
      <Title title={"Thông tin website"} />
      <div className="mt-[30px]">
        <WebsiteEditForm/>
      </div>
    </>
  );
}