import { Create } from "@/app/components/Admin/Create/Create";
import { RoleMultipleApply } from "@/app/components/Admin/MultipleApply/RoleMultipleApply";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

export default function RoleList() {
  return (
    <>
      <Title title={"Nhóm quyền"} />
      <div className="mt-[30px] flex gap-[20px] flex-wrap">
        <RoleMultipleApply />
        <Search />
        <Create link={"/admin/setting/role/create"} />
      </div>
      <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
        <table className="bg-white w-full min-w-[600px]">
          <thead className="">
            <tr className="bg-[#FCFDFD]">
              <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">
                <input type="checkbox" className="translate-y-[2px]" />
              </th>
              <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tên nhóm quyền</th>
              <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Mô tả ngắn</th>
              <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                <input type="checkbox" className="translate-y-[2px]" />
              </th>
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Quản trị viên</th>
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Có đầy đủ tất cả các quyền</th>
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
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Quản trị viên</th>
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Có đầy đủ tất cả các quyền</th>
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
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Quản trị viên</th>
              <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Có đầy đủ tất cả các quyền</th>
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
    </>
  );
}