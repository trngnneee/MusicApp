import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { RoleCreateForm } from "./RoleCreateForm";

export const metadata: Metadata = {
  title: "Tạo nhóm quyền",
  description: "Quản trị App Nghe nhạc",
};

export default function RoleCreate() {
  return (
    <>
      <Title title={"Tạo nhóm quyền"} />
      <div className="mt-[30px]">
        <RoleCreateForm/>
      </div>
    </>
  );
}