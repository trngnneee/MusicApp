import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const userUseAuth = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyToken`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "error")
        {
          setIsLogin(false);
          setUserInfo({});
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