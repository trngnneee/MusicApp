"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { CategoryCreateForm } from "./CategoryCreateForm";
import { useAuth } from "@/hooks/useAuth";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Tạo danh mục"} />
          <div className="mt-[30px]">
            <CategoryCreateForm />
          </div>
        </>
      )}
    </>
  );
}