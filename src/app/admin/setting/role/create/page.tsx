import { Title } from "@/app/components/Admin/Title/Title";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tạo nhóm quyền",
  description: "Quản trị App Nghe nhạc",
};

export default function RoleCreate() {
  return (
    <>
      <Title title={"Tạo nhóm quyền"} />
      <div className="mt-[30px]">
        <form className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]">
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên nhóm quyền</label>
              <input type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Mô tả ngắn</label>
              <input type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
          </div>
          <div className="w-full sm:w-[48%] my-[15px] sm:my-[30px]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Phân quyền</label>
            <div className="h-[150px] py-[18px] px-[23px] bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5] overflow-y-scroll flex flex-col gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">Xem trang Tổng quan</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">Xem danh mục</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">Tạo danh mục</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">Sửa danh mục</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">Xóa danh mục</label>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mb-[30px]">
            <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
              Tạo mới
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link href='/admin/setting/role/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
          </div>
        </form>
      </div>
    </>
  );
}