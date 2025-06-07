import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { CategoryEditForm } from "./CategoryEditForm";

export const metadata: Metadata = {
  title: "Chỉnh sửa danh mục",
  description: "Quản trị App Nghe nhạc",
};

export default function CategoryEdit() {
  return (
    <>
      <Title title={"Chỉnh sửa danh mục"} />
      <div className="mt-[30px]">
        <CategoryEditForm/>
      </div>
    </>
  );
}