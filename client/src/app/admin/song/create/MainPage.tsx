"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth"
import { SongCreateForm } from "./SongCreateForm";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Chỉnh sửa bài hát"} />
          <div className="mt-[30px]">
            <SongCreateForm />
          </div>
        </>
      )}
    </>
  );
}