import { Title } from "@/app/components/Admin/Title/Title";
import { ProfileEditForm } from "./ProfileEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa thông tin cá nhân",
  description: "Quản trị App Nghe nhạc",
};

export default function ProfileEdit() {
  return (
    <>
      <Title title={"Thông tin cá nhân"} />
      <div className="mt-[30px]">
        <ProfileEditForm/>
      </div>
    </>
  );
}