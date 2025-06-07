"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { AdminAccountCreateForm } from "./AdminAccountCreateForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Tạo tài khoản quản trị"} />
          <div className="mt-[30px]">
            <AdminAccountCreateForm />
          </div>
        </>
      )}
    </>
  );
}