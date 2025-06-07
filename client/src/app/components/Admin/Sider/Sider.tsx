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
  const { isLogin } = useAuth();

  const data = [
    {
      icon: <TbCategory className="translate-y-[1.5px]" />,
      link: "/admin/category/list",
      title: "Quản lý danh mục"
    },
    {
      icon: <GiMicrophone className="translate-y-[1.5px]" />,
      link: "/admin/singer/list",
      title: "Quản lý ca sĩ"
    },
    {
      icon: <IoMdMusicalNotes className="translate-y-[1.5px]" />,
      link: "/admin/song/list",
      title: "Quản lý bài hát"
    },
    {
      icon: <FaRegUser className="translate-y-[1.5px]" />,
      link: "/admin/user/list",
      title: "Quản lý người dùng"
    }
  ]

  const data2 = [
    {
      icon: <IoSettingsOutline className="translate-y-[1.5px]" />,
      link: "/admin/setting/list",
      title: "Cài đặt chung"
    },
    {
      icon: <FaRegUser className="translate-y-[1.5px]" />,
      link: "/admin/setting/profile/edit",
      title: "Thông tin cá nhân"
    }
  ]

  const handleLogout = () => {
    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/account/logout`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data) => {
        return data;
      })

    toast.promise(promise, {
      loading: "Đang xử lý...",
      success: (data) => {
        if (data.code == "success") {
          setTimeout(() => {
            router.push("/admin/account/login");
          }, 1000);
        }
        return data.message;
      },
      error: (data) => data.message
    })
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
                    <li className="" key={index}>
                      <div className={`w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px] ${(item.link == pathName ? " bg-[#4880FF] text-white" : "")}`}>
                        <Link href={item.link} className="flex gap-[16px] w-full">
                          {item.icon}
                          <div className="text-[14px] font-[600]">{item.title}</div>
                        </Link>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="py-[10px]">
              <ul>
                {
                  data2.map((item, index) => (
                    <li className="" key={index}>
                      <div className={`w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px] ${(item.link == pathName ? " bg-[#4880FF] text-white" : "")}`}>
                        <Link href={item.link} className="flex gap-[16px] w-full">
                          {item.icon}
                          <div className="text-[14px] font-[600]">{item.title}</div>
                        </Link>
                      </div>
                    </li>
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