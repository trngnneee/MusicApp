"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { RoleCreateForm } from "./RoleCreateForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Tạo nhóm quyền"} />
          <div className="mt-[30px]">
            <RoleCreateForm />
          </div>
        </>
      )}
    </>
  );
}