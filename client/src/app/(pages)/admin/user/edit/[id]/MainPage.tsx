"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { UserEditForm } from "./UserEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Chỉnh sửa thông tin người dùng"} />
          <div className="mt-[30px]">
            <UserEditForm />
          </div>
        </>
      )}
    </>
  );
}