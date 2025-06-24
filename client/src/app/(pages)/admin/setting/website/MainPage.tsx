"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { WebsiteEditForm } from "./WebsiteEditForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Thông tin website"} />
          <div className="mt-[30px]">
            <WebsiteEditForm />
          </div>
        </>
      )}
    </>
  );
}