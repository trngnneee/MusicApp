import { Title } from "@/app/components/Admin/Title/Title";
import Link from "next/link";
import { IoInformationOutline } from "react-icons/io5";
import { RiUserSettingsLine, RiUserLine } from "react-icons/ri";

export default function Setting() {
  return (
    <>
      <Title title={"Cài đặt chung"} />
      <div className="flex flex-col lg:flex-row gap-[30px] mt-[30px]">
        <Link href="/admin/setting/website" className="py-[25px] px-[30px] xl:px-[58px] bg-white rounded-[14px]">
          <div className="flex items-center gap-[20px]">
            <div className="bg-[#E7EDFF] rounded-[50%] w-[70px] h-[70px] flex items-center justify-center">
              <IoInformationOutline className="text-[40px] text-[#3a68f4]" />
            </div>
            <div className="text-[18px] font-[700] text-dark">
              Thông tin website
            </div>
          </div>
        </Link>
        <Link href="/admin/setting/admin-account/list" className="py-[25px] px-[30px] xl:px-[58px] bg-white rounded-[14px]">
          <div className="flex items-center gap-[20px]">
            <div className="bg-[#E7EDFF] rounded-[50%] w-[70px] h-[70px] flex items-center justify-center">
              <RiUserLine className="text-[40px] text-[#3a68f4]" />
            </div>
            <div className="text-[18px] font-[700] text-dark">
              Tài khoản quản trị
            </div>
          </div>
        </Link>
        <Link href="/admin/setting/role/list" className="py-[25px] px-[30px] xl:px-[58px] bg-white rounded-[14px]">
          <div className="flex items-center gap-[20px]">
            <div className="bg-[#E7EDFF] rounded-[50%] w-[70px] h-[70px] flex items-center justify-center">
              <RiUserSettingsLine className="text-[40px] text-[#3a68f4]" />
            </div>
            <div className="text-[18px] font-[700] text-dark">
              Nhóm quyền
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}