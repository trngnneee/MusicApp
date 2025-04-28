import { Create } from "@/app/components/Admin/Create/Create";
import { Filter } from "@/app/components/Admin/Filter/Filter";
import { MultipleApply } from "@/app/components/Admin/MultipleApply/MultipleApply";
import { Search } from "@/app/components/Admin/Search/Search";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Title } from "@/app/components/Admin/Title/Title";
import { FiEdit } from "react-icons/fi";  
import { FaRegTrashCan } from "react-icons/fa6";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";

export default function Category() {
  return (
    <>
      <Title title="Quản lý danh mục" />
      <Filter />
      <div className="mt-[15px] flex items-center gap-[20px]">
        <MultipleApply />
        <Search />
        <Create link={`/admin/category/create`}/>
      </div>
      <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-hidden">
        <table className="bg-white w-full">
          <thead className="">
            <tr className="bg-[#FCFDFD]">
              <th className="px-[32px] py-[15px] text-left align-middle">
                <input type="checkbox" className="translate-y-[2px]" />
              </th>
              <th className="px-[32px] py-[15px] text-left align-middle">Tên danh mục</th>
              <th className="px-[32px] py-[15px] text-left align-middle">Ảnh đại diện</th>
              <th className="px-[32px] py-[15px] text-left align-middle">Vị trí</th>
              <th className="px-[32px] py-[15px] text-left align-middle">Trạng thái</th>
              <th className="px-[32px] py-[15px] text-left align-middle">Tạo bởi</th>
              <th className="px-[32px] py-[15px] text-left align-middle">Cập nhật bởi</th>
              <th className="px-[32px] py-[15px] text-left align-middle">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
              <th className="px-[32px] py-[8px] text-left align-middle">
                <input type="checkbox" className="translate-y-[2px]" />
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Danh mục 1</th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="w-[60px] h-[60px] overflow-hidden">
                  <img src="/demoAvatar.png" className="w-full h-full object-cover"/>
                </div>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                1
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <Active />
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="flex flex-col items-start">
                  <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                  <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                </div>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="flex flex-col items-start">
                  <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                  <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                </div>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px]">
                  <button className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"><FiEdit /></button>
                  <button className="px-[16px] py-[11px] text-[#EF3826]"><FaRegTrashCan /></button>
                </div>
              </th>
            </tr>
            <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
              <th className="px-[32px] py-[8px] text-left align-middle">
                <input type="checkbox" className="translate-y-[2px]" />
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Danh mục 2</th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="w-[60px] h-[60px] overflow-hidden">
                  <img src="/demoAvatar.png" className="w-full h-full object-cover"/>
                </div>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                2
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <Inactive/>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="flex flex-col items-start">
                  <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                  <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                </div>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="flex flex-col items-start">
                  <div className="font-[600] text-[14px] text-dark">Lê Văn A</div>
                  <div className="font-[600] text-[12px] text-dark">16:30 - 20/10/2024</div>
                </div>
              </th>
              <th className="px-[32px] py-[8px] text-left align-middle">
                <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px]">
                  <button className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"><FiEdit /></button>
                  <button className="px-[16px] py-[11px] text-[#EF3826]"><FaRegTrashCan /></button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}