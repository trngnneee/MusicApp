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
import React from "react";
import { toast, Toaster } from "sonner";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginPreview);

export const CategoryEditForm = () => {
  const params = useParams();
  const [isValid, setIsValid] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState<any>();
  const [categoryTree, setCategoryTree] = useState<any[]>();
  const [status, setStatus] = useState<string>();
  const [parent, setParent] = useState<string>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = () => {
    const id = params.id;
    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category/edit/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.categoryDetail.avatar) {
          setAvatars([
            {
              source: data.categoryDetail.avatar
            }
          ])
        }
        setStatus(data.categoryDetail.status);
        setParent(data.categoryDetail.parent);
        setCategoryDetail(data.categoryDetail);
        setCategoryTree(data.categoryTree);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const validation = new JustValidate('#category-edit-form');

    validation
      .addField('#name', [
        { rule: 'required', errorMessage: 'Tên bắt buộc!' },
      ])
      .onSuccess(() => setIsValid(true))
      .onFail(() => setIsValid(false))
  }, []);

  const handleSubmit = (event) => {
    if (isSubmitting) return;
    if (isValid) {
      setIsSubmitting(true);

      event.preventDefault();

      const id = params.id;
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const description = event.target.description.value;

      let avatar = null;
      if (avatars.length > 0) {
        avatar = avatars[0].file;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent", parent);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("description", description);

      const token = localStorage.getItem("adminToken");

      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category/edit/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          if (data.code == "success") {
            setIsSubmitting(false);
            fetchData();
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

  const renderOption = (categoryTree, level = 0) => {
    return categoryTree.map((category, index) => (
      <React.Fragment key={index}>
        <option value={category.id}>
          {`${'--'.repeat(level + 1)} ${category.name}`}
        </option>
        {category.children && category.children.length && renderOption(category.children, level + 1)}
      </React.Fragment>
    ))
  }

  return (
    <>
      <Toaster />
      <form
        id="category-edit-form"
        className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%] mb-0">
            <label htmlFor='name' className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên danh mục</label>
            <input
              type="text"
              className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              id='name'
              defaultValue={categoryDetail && categoryDetail.name}
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='parent' className="text-[14px] font-[600px] text-dark mb-[11px] block">Danh mục cha</label>
            <select
              className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              id='parent'
              value={parent}
              onChange={(event) => setParent(event.target.value)}
            >
              <option value="">-- Chọn danh mục --</option>
              {categoryTree && categoryTree.length && renderOption(categoryTree)}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor='position' className="text-[14px] font-[600px] text-dark mb-[11px] block">Vị trí</label>
            <input
              type="number"
              className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              id='position'
              defaultValue={categoryDetail && categoryDetail.position}
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor='status' className="text-[14px] font-[600px] text-dark mb-[11px] block">Trạng thái</label>
            <select
              className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
              id='status'
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
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
        <div className="mb-[30px]">
          <label htmlFor='description' className="text-[14px] font-[600px] text-dark mb-[11px] block">Mô tả</label>
          <textarea
            className="w-full h-[200px] py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]"
            id='description'
            defaultValue={categoryDetail && categoryDetail.description}
          />
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
          <Link href='/admin/category/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
        </div>
      </form>
    </>
  );
}