"use client"

import Link from "next/link";
import JustValidate from 'just-validate';
import { useEffect, useState } from "react";
import { permissionList } from "@/config/variable.config";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export const RoleCreateForm = () => {
  const params = useParams();
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [roleInfo, setRoleInfo] = useState<any>({});
  const [permission, setPermission] = useState<string[]>([]);

  useEffect(() => {
    const id = params.id;
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/role/edit/${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setRoleInfo(data.roleInfo);
        setPermission(data.roleInfo.permissions);
      })
  }, [])

  const handleSubmit = (event: any) => {
    if (isSubmitting) return;
    if (isValid) {
      setIsSubmitting(true);
      event.preventDefault();

      const id = params.id;
      const name = event.target.name.value;
      const description = event.target.description.value;
      const tmp = new FormData(event.target);
      const permissions = tmp.getAll('role');

      const finalData = {
        name: name,
        description: description,
        permissions: permissions
      };

      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/role/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData),
        credentials: "include"
      })
        .then(res => res.json())
        .then((data) => {
          return data;
        });

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          if (data.code == "success") {
            setIsSubmitting(false);
          }
          return data.message;
        },
        error: (data) => {
          setIsSubmitting(false);
          return data.message;
        },
      })
    }
  }

  useEffect(() => {
    const validation = new JustValidate('#role-create-form');

    validation
      .addField('#name', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .addField('.role-checkbox', [
        {
          validator: () => {
            const checkboxes = document.querySelectorAll('.role-checkbox');
            return Array.from(checkboxes).some((cb) => (cb as HTMLInputElement).checked);
          },
          errorMessage: 'Phải chọn ít nhất 1 phân quyền!',
        },
      ], {
        errorsContainer: '#roles',
        errorLabelCssClass: 'text-red-500 text-[13px] mt-[6px] block',
      })
      .onSuccess(() => setIsValid(true))
      .onFail(() => setIsValid(false))
  }, []);

  return (
    <>
      {roleInfo && (
        <form id="role-create-form" className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label htmlFor="name" className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên nhóm quyền</label>
              <input id="name" type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={roleInfo.name} />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor="description" className="text-[14px] font-[600px] text-dark mb-[11px] block">Mô tả ngắn</label>
              <input id="description" type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={roleInfo.description} />
            </div>
          </div>
          <div id="roles" className="w-full my-[15px] sm:my-[30px]">
            <label htmlFor="roles" className="text-[14px] font-[600px] text-dark mb-[11px] block">Phân quyền</label>
            <div className="h-[300px] py-[18px] px-[23px] bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
              {permissionList.map((item, index) => (
                <div className="flex items-center gap-[10px]" key={index}>
                  <input
                    id={`role-${item.value}`}
                    name="role"
                    type="checkbox"
                    className="w-[18px] h-[18px] role-checkbox"
                    value={item.value}
                    checked={permission && permission.length > 0 && permission.includes(item.value)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setPermission((prev) => [...prev, item.value]);
                      } else {
                        setPermission((prev) => prev.filter(p => p !== item.value));
                      }
                    }}
                  />
                  <label htmlFor={`role-${item.value}`} className="text-[10px] sm:text-[14px] font-[600] text-dark">{item.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center mb-[30px]">
            <button
              className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Chỉnh sửa"}
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link href='/admin/setting/role/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
          </div>
        </form>
      )}
    </>
  );
}