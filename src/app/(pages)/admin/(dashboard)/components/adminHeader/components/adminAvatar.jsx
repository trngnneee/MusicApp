import { Button } from "@/components/ui/button"
import { useAdminAuthContext } from "@/context/adminAuthProvider"

export const AdminAvatar = () => {
  const { userInfo } = useAdminAuthContext();
  
  if (!userInfo) return null;
  
  return (
    <Button className="gap-0 rounded-full py-0 ps-0 bg-[#2B3674] hover:bg-[#2B3674] text-white h-10">
      <div className="me-0.5 flex aspect-square h-full p-1.5">
        <img
          className="h-auto w-full rounded-full"
          src={userInfo.avatar}
          alt="Profile image"
          width={24}
          height={24}
          aria-hidden="true"
        />
      </div>
      {userInfo.fullName}
    </Button>
  )
}