import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const useAuth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/auth/verifyToken`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "error")
        {
          router.push("/admin/account/login");
        }
        if (data.code == "success")
        {
          setIsLogin(true);
          setUserInfo(data.userInfo);
        }
      })
  }, [])

  return { isLogin, userInfo };
}