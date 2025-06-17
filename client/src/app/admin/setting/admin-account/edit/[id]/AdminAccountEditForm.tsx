"use client"

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginPreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JustValidate from 'just-validate';
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginPreview);

export const AdminAccountEditForm = () => {
  const router = useRouter();
  const params = useParams();
  const [avatars, setAvatars] = useState([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [roleList, setRoleList] = useState<any[]>([]);

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const id = params.id;
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/edit/${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data) => {
        setUserInfo(data.userInfo);
        setRoleList(data.roleList);
        setRole(data.userInfo.role);
        setStatus(data.userInfo.status);
        if (data.userInfo.avatar) {
          setAvatars([
            {
              source: data.userInfo.avatar
            }
          ])
        }
      })
  }, [])

  useEffect(() => {
    const validation = new JustValidate('#admin-account-edit-form');

    validation
      .addField('#fullName', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .addField('#email', [
        { rule: 'required', errorMessage: 'Email bắt buộc!' },
        { rule: 'email', errorMessage: 'Email sai định dạng!' },
      ])
      .onSuccess(() => setIsValid(true))
      .onFail(() => setIsValid(false))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = params.id;
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const role = event.target.role.value;
    const jobPosition = event.target.jobPosition.value;
    const status = event.target.status.value;

    let avatar = null;
    if (avatars && avatars.length > 0) {
      avatar = avatars[0].file;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("jobPosition", jobPosition);
    formData.append("status", status);
    formData.append("avatar", avatar);

    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/edit/${id}`, {
      method: "PATCH",
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
      success: (data) => {
        if (data.code == "success") {
        }
        return data.message;
      },
      error: (data) => {
        return data.message;
      }
    })
  }

  return (
    <>
      {userInfo && (
        <form id='admin-account-edit-form' className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label htmlFor='fullName' className="text-[14px] font-[600px] text-dark mb-[11px] block">Họ tên</label>
              <input id='fullName' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={userInfo.fullName} />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor='email' className="text-[14px] font-[600px] text-dark mb-[11px] block">Email</label>
              <input id='email' type="email" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={userInfo.email} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label htmlFor='phone' className="text-[14px] font-[600px] text-dark mb-[11px] block">Số điện thoại</label>
              <input id='phone' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={userInfo.phone} />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor='role' className="text-[14px] font-[600px] text-dark mb-[11px] block">Nhóm quyền</label>
              <select
                id='role'
                className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value={""}>-- Chọn nhóm quyền --</option>
                {roleList && roleList.length && roleList.map((item, index) => (
                  <option value={item.id} key={index}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label htmlFor='jobPosition' className="text-[14px] font-[600px] text-dark mb-[11px] block">Chức vụ</label>
              <input id='jobPosition' type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={userInfo.jobPosition} />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor='status' className="text-[14px] font-[600px] text-dark mb-[11px] block">Trạng thái</label>
              <select id='status' className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="active">Hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            </div>
          </div>
          <div className="mb-[40px]">
            <label htmlFor='avatar' className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh danh mục</label>
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
            <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Chỉnh sửa"}
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link href='/admin/setting/admin-account/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
          </div>
        </form>
      )}
    </>
  );
}