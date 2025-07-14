import Link from "next/link";
import { TbCategory } from "react-icons/tb";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { GiMicrophone } from "react-icons/gi";
import { useAuth } from "@/hooks/useAuth";
import { toast, Toaster } from "sonner";

export const AdminSider = (props: { className?}) => {
  const pathName = usePathname();
  const router = useRouter();
  const { className } = props;
  const { isLogin, userInfo } = useAuth();

  const hasPermission = (permission: string) => {
    return userInfo?.permission?.includes(permission) || false;
  };

  const data = [
    {
      icon: <TbCategory className="translate-y-[1.5px]" />,
      link: "/admin/category/list",
      title: "Quản lý danh mục",
      display: hasPermission("category-view")
    },
    {
      icon: <GiMicrophone className="translate-y-[1.5px]" />,
      link: "/admin/singer/list",
      title: "Quản lý ca sĩ",
      display: hasPermission("singer-view")
    },
    {
      icon: <IoMdMusicalNotes className="translate-y-[1.5px]" />,
      link: "/admin/song/list",
      title: "Quản lý bài hát",
      display: hasPermission("song-view")
    }
  ]

  const data2 = [
    {
      icon: <IoSettingsOutline className="translate-y-[1.5px]" />,
      link: "/admin/setting/list",
      title: "Cài đặt chung",
      display: hasPermission("setting-view")
    },
    {
      icon: <FaRegUser className="translate-y-[1.5px]" />,
      link: "/admin/setting/profile/edit",
      title: "Thông tin cá nhân",
      display: true
    }
  ]

  const handleLogout = () => {
    toast.success("Đăng xuất thành công!");
    localStorage.removeItem("adminToken");
    setTimeout(() => {
      router.push("/admin/account/login");
    }, 1000);
  }

  return (
    <>
      <Toaster />
      {isLogin && (
        <>
          <div className={"bg-white w-[240px] min-h-screen border-r-[1px] border-r-[#E0E0E0] " + className}>
            <div className="border-b-[1px] border-b-[#E0E0E0] py-[10px]">
              <ul>
                {
                  data.map((item, index) => (
                    item.display && (
                      <li className="" key={index}>
                        <div className={`w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px] ${(item.link == pathName ? " bg-[#4880FF] text-white" : "")}`}>
                          <Link href={item.link} className="flex gap-[16px] w-full">
                            {item.icon}
                            <div className="text-[14px] font-[600]">{item.title}</div>
                          </Link>
                        </div>
                      </li>
                    )
                  ))
                }
              </ul>
            </div>
            <div className="py-[10px]">
              <ul>
                {
                  data2.map((item, index) => (
                    item.display && (
                      <li className="" key={index}>
                        <div className={`w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px] ${(item.link == pathName ? " bg-[#4880FF] text-white" : "")}`}>
                          <Link href={item.link} className="flex gap-[16px] w-full">
                            {item.icon}
                            <div className="text-[14px] font-[600]">{item.title}</div>
                          </Link>
                        </div>
                      </li>
                    )
                  ))
                }
                <li className="">
                  <div className="w-[80%] text-[#F93C65] py-[12px] px-[10px] mx-auto rounded-[10px]" onClick={handleLogout}>
                    <Link href="#" className="flex gap-[16px] w-full">
                      <FaPowerOff className="translate-y-[1.5px]" />
                      <div className="text-[14px] font-[600]">Đăng xuất</div>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}