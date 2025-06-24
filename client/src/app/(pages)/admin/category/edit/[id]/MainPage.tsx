"use client"

import { useAuth } from "@/hooks/useAuth";
import { CategoryEditForm } from "./CategoryEditForm";
import { Title } from "@/app/components/Admin/Title/Title";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && userInfo.permission.includes("category-edit") && (
        <>
          <Title title={"Chỉnh sửa danh mục"} />
          <div className="mt-[30px]">
            <CategoryEditForm />
          </div>
        </>
      )}
    </>
  );
}