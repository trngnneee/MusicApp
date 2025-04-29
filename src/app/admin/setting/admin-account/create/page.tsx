"use client"

import { Title } from "@/app/components/Admin/Title/Title";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from "react";
import Link from "next/link";

registerPlugin(FilePondPluginImagePreview);

export default function AdminAccountCreate() {
  const [files, setFiles] = useState([]);

  return (
    <>
      <Title title={"Tạo tài khoản quản trị"} />
      <div className="mt-[30px]">
        <form className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]">
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Họ tên</label>
              <input type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Email</label>
              <input type="email" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Số điện thoại</label>
              <input type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Nhóm quyền</label>
              <select className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]">
                <option value="">Quản trị viên</option>
                <option value="">Quản lý bài hát</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Chức vụ</label>
              <input type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Trạng thái</label>
              <select className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]">
                <option value="">Hoạt động</option>
                <option value="">Tạm dừng</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Mật khẩu</label>
              <input type="password" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
          </div>
          <div className="mb-[40px]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh danh mục</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              acceptedFileTypes={['image/*']}
              name="files"
              labelIdle='
              <div class="flex flex-col items-center justify-center w-full h-full text-dark text-[16px] font-medium text-center">
                Kéo thả hoặc <u className="cursor-pointer">Chọn file ảnh</u>
              </div>'
              className="w-[150px] h-[150px]"
            />
          </div>
          <div className="w-full flex justify-center mb-[30px]">
            <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
              Tạo mới
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link href='/admin/setting/admin-account/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
          </div>
        </form>
      </div>
    </>
  );
}