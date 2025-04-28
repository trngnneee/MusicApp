import Link from "next/link";
import { TbCategory } from "react-icons/tb";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";

export const Sider = () => {
  return (
    <>
      <div className="bg-white w-[240px] min-h-screen border-r-[1px] border-r-[#E0E0E0]">
        <div className="border-b-[1px] border-b-[#E0E0E0] py-[10px]">
          <ul>
            <li className="">
              <div className="w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px]">
                <Link href="#" className="flex gap-[16px] w-full">
                  <TbCategory className="translate-y-[1.5px]" />
                  <div className="text-[14px] font-[600]">Quản lý danh mục</div>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px]">
                <Link href="#" className="flex gap-[16px] w-full">
                  <IoMdMusicalNotes className="translate-y-[1.5px]" />
                  <div className="text-[14px] font-[600]">Quản lý bài hát</div>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px]">
                <Link href="#" className="flex gap-[16px] w-full">
                  <FaRegUser className="translate-y-[1.5px]" />
                  <div className="text-[14px] font-[600]">Quản lý người dùng</div>
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="py-[10px]">
          <ul>
            <li className="">
              <div className="w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px]">
                <Link href="#" className="flex gap-[16px] w-full">
                  <IoSettingsOutline className="translate-y-[1.5px]" />
                  <div className="text-[14px] font-[600]">Cài đặt chung</div>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="w-[80%] hover:bg-[#4880FF] text-dark hover:text-white py-[12px] px-[10px] mx-auto rounded-[10px]">
                <Link href="#" className="flex gap-[16px] w-full">
                  <FaRegUser className="translate-y-[1.5px]" />
                  <div className="text-[14px] font-[600]">Thông tin cá nhân</div>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="w-[80%] text-[#F93C65] py-[12px] px-[10px] mx-auto rounded-[10px]">
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
  );
}