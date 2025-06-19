"use client"

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginPreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JustValidate from 'just-validate';
import { toast, Toaster } from "sonner";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginPreview);

export const ProfileEditForm = () => {
  const [avatars, setAvatars] = useState<any[]>();
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/profile`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.userInfo);
        setAvatars([
          {
            source: data.userInfo.avatar
          }
        ])
      })
  }, [])

  useEffect(() => {
    const validation = new JustValidate('#profile-edit-form');

    validation
      .addField('#fullName', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .addField('#phone', [
        { rule: 'required', errorMessage: 'Số điện thoại bắt buộc!' },
      ])
      .onSuccess(() => setIsValid(true))
      .onFail(() => setIsValid(false))
  }, []);

  const handleSubmit = (event: any) => {
    if (isSubmitting) return;
    event.preventDefault();
    if (isValid) {
      setIsSubmitting(true);
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;

      let avatar = null;
      if (avatars.length > 0) {
        avatar = avatars[0].file;
      }

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("avatar", avatar);

      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/profile`, {
        method: "POST",
        credentials: "include",
        body: formData
      })
        .then(res => res.json())
        .then((data) => {
          setIsSubmitting(false);
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => data.message,
        error: (data) => data.message,
      })
    }
  }

  return (
    <>
      {userInfo && (
        <>
          <Toaster/>
          <form id='profile-edit-form' className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
              <div className="w-full sm:w-[48%]">
                <label htmlFor='fullName' className="text-[14px] font-[600px] text-dark mb-[11px] block">Họ tên</label>
                <input 
                  id='fullName' 
                  type="text" 
                  className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" 
                  defaultValue={userInfo.fullName}
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <label htmlFor='phone' className="text-[14px] font-[600px] text-dark mb-[11px] block">Số điện thoại</label>
                <input 
                  id='phone' 
                  type="text" 
                  className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" 
                  defaultValue={userInfo.phone}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
              <div className="w-full sm:w-[48%]">
                <label htmlFor='jobPosition' className="text-[14px] font-[600px] text-dark mb-[11px] block">Chức vụ</label>
                <input 
                  id='jobPosition' 
                  type="text" 
                  className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" 
                  defaultValue={userInfo.jobPosition}
                  readOnly
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <label htmlFor='role' className="text-[14px] font-[600px] text-dark mb-[11px] block">Nhóm quyền</label>
                <input 
                  id='role' 
                  type="text" 
                  className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" 
                  defaultValue={userInfo.role}
                  readOnly
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
                  defaultValue={userInfo.email}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-[40px]">
              <label htmlFor='avatar' className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh đại diện</label>
              <FilePond
                name="avatar"
                allowMultiple={false}
                allowRemove={true}
                acceptedFileTypes={["image/*"]}
                labelIdle="+"
                files={avatars}
                onupdatefiles={setAvatars}
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
      )}
    </>
  );
}