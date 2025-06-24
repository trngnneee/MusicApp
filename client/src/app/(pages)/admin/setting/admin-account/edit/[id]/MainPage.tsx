"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { AdminAccountEditForm } from "./AdminAccountEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && userInfo.permission.includes("admin-account-edit") && (
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