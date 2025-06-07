"use client"

import { Create } from "@/app/components/Admin/Create/Create";
import { MultipleApply } from "@/app/components/Admin/MultipleApply/MultipleApply";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Trash } from "@/app/components/Admin/Trash/Trash";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth"
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SingerFilter } from "./SingerFilter";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Quản lý ca sĩ"} />
          <SingerFilter />
          <div className="flex gap-[20px] mt-[20px] flex-wrap">
            <MultipleApply />
            <Search />
            <div className="flex gap-[20px]">
              <Create link={"/admin/singer/create"} />
              <Trash link={"/admin/singer/trash"} />
            </div>
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-scroll w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tên ca sĩ</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Vị trí</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tạo bởi</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Cập nhật bởi</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Ca sĩ 1</th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img src="/demoAvatar.png" className="w-full h-full object-cover" />
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                    1
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <Active />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="flex flex-col items-start">
                      <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                      <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="flex flex-col items-start">
                      <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                      <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                      <button className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"><FiEdit /></button>
                      <button className="px-[16px] py-[11px] text-[#EF3826]"><FaRegTrashCan /></button>
                    </div>
                  </th>
                </tr>
                <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Ca sĩ 2</th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img src="/demoAvatar.png" className="w-full h-full object-cover" />
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                    2
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <Inactive />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="flex flex-col items-start">
                      <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                      <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="flex flex-col items-start">
                      <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                      <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
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