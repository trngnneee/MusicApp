"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { AdminAccountEditForm } from "./AdminAccountEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Chỉnh sửa tài khoản quản trị"} />
          <div className="mt-[30px]">
            <AdminAccountEditForm />
          </div>
        </>
      )}
    </>
  );
}