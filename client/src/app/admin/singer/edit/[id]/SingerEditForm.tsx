"use client"

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginPreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import JustValidate from 'just-validate';
import { useParams } from "next/navigation";
import { toast } from "sonner";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginPreview);

export const SingerEditForm = () => {
  const params = useParams();
  const [avatars, setAvatars] = useState([]);
  const [singerDetail, setSingerDetail] = useState<any>();
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState("");

  const fetchData = () => {
    const id = params.id;
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/edit/${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setSingerDetail(data.singerDetail);
        setStatus(data.singerDetail.status);
        setAvatars([
          {
            source: data.singerDetail.avatar
          }
        ])
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const validation = new JustValidate('#singer-edit-form');

    validation
      .addField('#name', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .onSuccess(() => {
        setIsValid(true);
      })
      .onFail(() => setIsValid(false))
  }, []);

  const handleSubmit = (event) => {
    if (isSubmitting) return;
    if (isValid) {
      setIsSubmitting(true);
      const id = params.id;
      event.preventDefault();

      const name = event.target.name.value;
      const position = event.target.position.value;
      const description = event.target.description.value;

      let avatar = null;
      if (avatars.length > 0) {
        avatar = avatars[0].file;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("description", description);

      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/edit/${id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          if (data.code == "success") {
            fetchData();
            setIsSubmitting(false);
          }
          return data.message;
        },
        error: (data) => {
          setIsSubmitting(false);
          return data.message;
        }
      })
    }
  }

  return (
    <>
      <form id='singer-edit-form' className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='name' className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên ca sĩ</label>
            <input
              id='name'
              type="text"
              className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              defaultValue={singerDetail && singerDetail.name}
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='position' className="text-[14px] font-[600px] text-dark mb-[11px] block">Vị trí</label>
            <input
              id='position'
              type="number"
              className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              defaultValue={singerDetail && singerDetail.position}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='status' className="text-[14px] font-[600px] text-dark mb-[11px] block">Trạng thái</label>
            <select
              id='status'
              className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
            </select>
          </div>
        </div>
        <div className="mb-[40px]">
          <label htmlFor='avatar' className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh ca sĩ</label>
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
        <div className="mb-[30px]">
          <label htmlFor='description' className="text-[14px] font-[600px] text-dark mb-[11px] block">Mô tả</label>
          <textarea
            id='description'
            className="w-full h-[200px] py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
            defaultValue={singerDetail && singerDetail.description}
          />
        </div>
        <div className="w-full flex justify-center mb-[30px]">
          <button disabled={isSubmitting} className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
            {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Link href='/admin/singer/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
        </div>
      </form>
    </>
  );
}