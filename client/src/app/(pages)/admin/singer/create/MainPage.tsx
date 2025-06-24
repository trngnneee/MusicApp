"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { SingerCreateForm } from "./SingerCreateForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && userInfo.permission.includes("singer-create") && (
        <>
          <Title title={"Thêm ca sĩ"} />
          <div className="mt-[30px]">
            <SingerCreateForm />
          </div>
        </>
      )}
    </>
  );
}