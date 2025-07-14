import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const useAuth = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token)
    {
      router.push("/admin/account/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/auth/verifyToken`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "error")
        {
          localStorage.removeItem("adminToken");
          // router.push("/admin/account/login");
        }
        if (data.code == "success")
        {
          setIsLogin(true);
          setUserInfo(data.userInfo);
        }
      })
  }, [pathName])

  return { isLogin, userInfo };
}