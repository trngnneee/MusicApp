import useAdminAuth from "@/hooks/useAdminAuth";
import { createContext, useContext } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const { isLogin, userInfo } = useAdminAuth();

  return (
    <AdminAuthContext.Provider value={{ isLogin, userInfo }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuthContext() {
  return useContext(AdminAuthContext);
}