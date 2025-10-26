"use client"

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");

    if (!token) {
      router.push("/admin/account/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/verifyToken`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data.code === "success") {
          setUserInfo(data.userInfo);
          setIsLogin(true);
        } else {
          Cookies.remove("adminToken");
          router.push("/admin/account/login");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        router.push("/admin/account/login");
      }
    };

    verifyToken();
  }, [router]);

  return { userInfo, isLogin };
}