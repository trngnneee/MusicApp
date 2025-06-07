"use client"

import { Create } from "@/app/components/Admin/Create/Create";
import { MultipleApply } from "@/app/components/Admin/MultipleApply/MultipleApply";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { AdminAccountFilter } from "./AdminAccountFilter";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Tài khoản quản trị"} />
          <AdminAccountFilter />
          <div className="flex gap-[20px] sm:gap-[30px] mt-[15px] flex-wrap">
            <MultipleApply />
            <Search />
            <Create link={"/admin/setting/admin-account/create"} />
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Họ tên</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Email</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Số điện thoại</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Nhóm quyền</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Chức vụ</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] xl:px-[20px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Lê Văn A</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img src="/demoAvatar.png" className="w-full h-full object-cover" />
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">levana@gmail.com</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">0123456789</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Quản trị viên</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Giám đốc</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <Active />
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                      <button className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"><FiEdit /></button>
                      <button className="px-[16px] py-[11px] text-[#EF3826]"><FaRegTrashCan /></button>
                    </div>
                  </th>
                </tr>
                <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Lê Văn A</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img src="/demoAvatar.png" className="w-full h-full object-cover" />
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">levana@gmail.com</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">0123456789</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Quản trị viên</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Giám đốc</th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <Active />
                  </th>
                  <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                    <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                      <button className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"><FiEdit /></button>
                      <button className="px-[16px] py-[11px] text-[#EF3826]"><FaRegTrashCan /></button>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-[20px] flex gap-[20px] items-center">
            <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị 1 - 9 của 78</div>
            <div className="border-[0.6px] border-[#D5D5D5] rounded-[8px]">
              <select className="px-[14px] py-[6px] rounded-[8px] outline-none text-[14px] font-[600] text-dark opacity-[0.6]">
                <option>Trang 1</option>
                <option>Trang 2</option>
                <option>Trang 3</option>
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
}