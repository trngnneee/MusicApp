"use client"

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JustValidate from 'just-validate';

registerPlugin(FilePondPluginImagePreview);

export const WebsiteEditForm = () => {
  const [files, setFiles] = useState([]);
  const [favicon, setFavicon] = useState([]);
  const filesRef = useRef(files);
  const faviconRef = useRef(favicon);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);
  useEffect(() => {
    faviconRef.current = favicon;
  }, [favicon]);

  useEffect(() => {
    const validation = new JustValidate('#website-info-edit');

    validation
      .addField('#name', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .addField('#phone', [
        { rule: 'required', errorMessage: 'Số điện thoại bắt buộc!' },
      ])
      .addField('#email', [
        { rule: 'required', errorMessage: 'Email bắt buộc!' },
        { rule: 'email', errorMessage: 'Email sai định dạng!' },
      ])
      .addField('#address', [
        { rule: 'required', errorMessage: 'Địa chỉ bắt buộc!' },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;
        
        let logo = null;
        if (filesRef.current.length > 0) {
          logo = filesRef.current[0].file;
        }

        let favicon = null;
        if (faviconRef.current.length > 0) {
          favicon = filesRef.current[0].file;
        }

        console.log(name);        
        console.log(email);        
        console.log(phone);        
        console.log(address);        
        console.log(logo);        
        console.log(favicon);        
      });
  }, []);

  return (
    <>
      <form id='website-info-edit' className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]">
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='name' className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên website</label>
            <input id='name' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='phone' className="text-[14px] font-[600px] text-dark mb-[11px] block">Số điện thoại</label>
            <input id='phone' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='email' className="text-[14px] font-[600px] text-dark mb-[11px] block">Email</label>
            <input id='email' type="email" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='address' className="text-[14px] font-[600px] text-dark mb-[11px] block">Địa chỉ</label>
            <input id='address' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="">
            <label htmlFor='logo' className="text-[14px] font-[600px] text-dark mb-[11px] block">Logo</label>
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
              id='logo'
            />
          </div>
          <div className="]">
            <label htmlFor='favicon' className="text-[14px] font-[600px] text-dark mb-[11px] block">Favicon</label>
            <FilePond
              files={favicon}
              onupdatefiles={setFavicon}
              allowMultiple={false}
              acceptedFileTypes={['image/*']}
              name="files"
              labelIdle='
              <div class="flex flex-col items-center justify-center w-full h-full text-dark text-[16px] font-medium text-center">
                Kéo thả hoặc <u className="cursor-pointer">Chọn file ảnh</u>
              </div>'
              className="w-[150px] h-[150px]"
              id='favicon'
            />
          </div>
        </div>
        <div className="w-full flex justify-center mb-[30px]">
          <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
            Cập nhật
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Link href='/admin/setting/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
        </div>
      </form>
    </>
  );
}