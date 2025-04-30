import { Title } from "@/app/components/Admin/Title/Title";
import { UserEditForm } from "./UserEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa thông tin người dùng",
  description: "Quản trị App Nghe nhạc",
};

export default function UserEdit() {
  return (
    <>
      <Title title={"Chỉnh sửa thông tin người dùng"} />
      <div className="mt-[30px]">
        <UserEditForm/>
      </div>
    </>
  );
}