import { Title } from "@/app/components/Admin/Title/Title";
import { AdminAccountCreateForm } from "./AdminAccountCreateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo tài khoản quản trị",
  description: "Quản trị App Nghe nhạc",
};

export default function AdminAccountCreate() {
  return (
    <>
      <Title title={"Tạo tài khoản quản trị"} />
      <div className="mt-[30px]">
        <AdminAccountCreateForm/>
      </div>
    </>
  );
}