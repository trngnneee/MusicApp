"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { ProfileEditForm } from "./ProfileEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Thông tin cá nhân"} />
          <div className="mt-[30px]">
            <ProfileEditForm />
          </div>
        </>
      )}
    </>
  );
}