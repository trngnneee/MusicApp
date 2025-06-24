"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { SingerEditForm } from "./SingerEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && userInfo.permission.includes("singer-edit") && (
        <>
          <Title title={"Chỉnh sửa ca sĩ"} />
          <div className="mt-[30px]">
            <SingerEditForm />
          </div>
        </>
      )}
    </>
  );
}