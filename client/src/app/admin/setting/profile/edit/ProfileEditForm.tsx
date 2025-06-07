"use client"

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JustValidate from 'just-validate';

registerPlugin(FilePondPluginImagePreview);

export const ProfileEditForm = () => {
  const [files, setFiles] = useState([]);
  const filesRef = useRef(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    const validation = new JustValidate('#profile-edit-form');

    validation
      .addField('#name', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .addField('#email', [
        { rule: 'required', errorMessage: 'Email bắt buộc!' },
        { rule: 'email', errorMessage: 'Email sai định dạng!' },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const jobPosition = event.target.jobPosition.value;
        const role = event.target.role.value;    

        let avatar = null;
        if (filesRef.current.length > 0) {
          avatar = filesRef.current[0].file;
        }

        console.log(name);
        console.log(email);
        console.log(jobPosition);
        console.log(role);
        console.log(avatar);
      });
  }, []);

  return (
    <>
      <form id='profile-edit-form' className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]">
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='name' className="text-[14px] font-[600px] text-dark mb-[11px] block">Họ tên</label>
            <input id='name' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='email' className="text-[14px] font-[600px] text-dark mb-[11px] block">Email</label>
            <input id='email' type="email" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='jobPosition' className="text-[14px] font-[600px] text-dark mb-[11px] block">Chức vụ</label>
            <input id='jobPosition' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='role' className="text-[14px] font-[600px] text-dark mb-[11px] block">Nhóm quyền</label>
            <input id='role' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
        </div>
        <div className="mb-[40px]">
          <label htmlFor='avatar' className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh danh mục</label>
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
            id='avatar'
          />
        </div>
        <div className="w-full flex justify-center mb-[30px]">
          <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
            Cập nhật
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Link href='/admin/setting/profile/reset-password'><u className="text-[18px] font-[700] text-[#4880FF]">Đổi mật khẩu</u></Link>
        </div>
      </form>
    </>
  );
}