"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { RoleCreateForm } from "./RoleEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && userInfo.permission.includes("role-edit") && (
        <>
          <Title title={"Chỉnh sửa nhóm quyền"} />
          <div className="mt-[30px]">
            <RoleCreateForm />
          </div>
        </>
      )}
    </>
  );
}