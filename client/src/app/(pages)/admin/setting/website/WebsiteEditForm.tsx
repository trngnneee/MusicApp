"use client"

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginPreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import JustValidate from 'just-validate';
import { toast } from "sonner";

registerPlugin(FilePondPluginPreview, FilePondPluginFileValidateType);

export const WebsiteEditForm = () => {
  const [logos, setLogos] = useState([]);
  const [favicons, setFavicons] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [websiteInfo, setWebsiteInfo] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/website-info`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((data) => {
        setWebsiteInfo(data.websiteInfo);
        if (data.websiteInfo.logo)
        {
          setLogos([
            {
              source: data.websiteInfo.logo
            }
          ])
        }
        if (data.websiteInfo.favicon)
        {
          setFavicons([
            {
              source: data.websiteInfo.favicon
            }
          ])
        }
      })
  }, [])

  const handleSubmit = (event: any) => {
    if (isSubmitting) return;
    if (isValid) {
      setIsSubmitting(true);
      event.preventDefault();

      const name = event.target.name.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const address = event.target.address.value;

      let logo = null;
      if (logos.length > 0) {
        logo = logos[0].file;
      }

      let favicon = null;
      if (favicons.length > 0) {
        favicon = favicons[0].file;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("logo", logo);
      formData.append("favicon", favicon);

      const token = localStorage.getItem("adminToken");
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/website-info`, {
        method: "PATCH",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then((data) => {
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          if (data.code == "success") {

          }
          setIsSubmitting(false);
          return data.message;
        },
        error: (data) => {
          setIsSubmitting(false);
          return data.message;
        }
      })
    }
  }

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
      .onSuccess(() => setIsValid(true))
      .onFail(() => setIsValid(false))
  }, []);

  return (
    <>
      {websiteInfo && (
        <form id='website-info-edit' className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label htmlFor='name' className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên website</label>
              <input 
                id='name' 
                type="text" 
                className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
                defaultValue={websiteInfo.name}
                />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor='phone' className="text-[14px] font-[600px] text-dark mb-[11px] block">Số điện thoại</label>
              <input 
                id='phone' 
                type="text" 
                className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
                defaultValue={websiteInfo.phone}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label htmlFor='email' className="text-[14px] font-[600px] text-dark mb-[11px] block">Email</label>
              <input 
                id='email' 
                type="email"
                className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" 
                defaultValue={websiteInfo.email} 
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor='address' className="text-[14px] font-[600px] text-dark mb-[11px] block">Địa chỉ</label>
              <input 
                id='address' 
                type="text" 
                className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" 
                defaultValue={websiteInfo.address}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="">
              <label htmlFor='logo' className="text-[14px] font-[600px] text-dark mb-[11px] block">Logo</label>
              <FilePond
                name="avatar"
                allowMultiple={false}
                allowRemove={true}
                acceptedFileTypes={["image/*"]}
                labelIdle="+"
                files={logos}
                onupdatefiles={setLogos}
                className="w-[150px] h-[150px]"
              />
            </div>
            <div className="]">
              <label htmlFor='favicon' className="text-[14px] font-[600px] text-dark mb-[11px] block">Favicon</label>
              <FilePond
                name="favicon"
                allowMultiple={false}
                allowRemove={true}
                acceptedFileTypes={["image/*"]}
                labelIdle="+"
                files={favicons}
                onupdatefiles={setFavicons}
                className="w-[150px] h-[150px]"
              />
            </div>
          </div>
          <div className="w-full flex justify-center mb-[30px]">
            <button
              className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link href='/admin/setting/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
          </div>
        </form>
      )}
    </>
  );
}