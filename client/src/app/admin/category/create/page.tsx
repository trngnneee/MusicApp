import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import { CategoryCreateForm } from "./CategoryCreateForm";

export const metadata: Metadata = {
  title: "Tạo danh mục",
  description: "Quản trị App Nghe nhạc",
};

export default function CategoryCreate() {
  return (
    <>
      <Title title={"Tạo danh mục"} />
      <div className="mt-[30px]">
        <CategoryCreateForm/>
      </div>
    </>
  );
}