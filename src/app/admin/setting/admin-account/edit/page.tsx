import { Title } from "@/app/components/Admin/Title/Title";
import { AdminAccountEditForm } from "./AdminAccountEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa tài khoản quản trị",
  description: "Quản trị App Nghe nhạc",
};

export default function AdminAccountEdit() {
  return (
    <>
      <Title title={"Chỉnh sửa tài khoản quản trị"} />
      <div className="mt-[30px]">
        <AdminAccountEditForm/>
      </div>
    </>
  );
}