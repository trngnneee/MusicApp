"use client"

import Link from "next/link";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginPreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useEffect, useState } from "react";
import JustValidate from 'just-validate';
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast, Toaster } from "sonner";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginPreview);

export const SongEditForm = () => {
  const router = useRouter();
  const params = useParams();
  const [avatars, setAvatars] = useState([]);
  const [audios, setAudios] = useState([]);

  const [songDetail, setSongDetail] = useState<any>();
  const [categoryTree, setCategoryTree] = useState<any[]>([])
  const [singerList, setSingerList] = useState<any[]>([])

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const id = params.id;
    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/song/edit/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((data) => {
        setSongDetail(data.songDetail);
        setCategoryTree(data.categoryTree);
        setSingerList(data.singerList);
        setCategory(data.songDetail.category);
        setStatus(data.songDetail.status);
        if (data.songDetail.avatar) {
          setAvatars([
            {
              source: data.songDetail.avatar
            }
          ])
        }
        if (data.songDetail.audio) {
          setAudios([
            {
              source: data.songDetail.audio
            }
          ])
        }
      })
  }, [])

  const handleSubmit = (event) => {
    if (isSubmitting) return;
    if (isValid) {
      setIsSubmitting(true);
      event.preventDefault();

      const id = params.id;

      const tmp = new FormData(event.target);

      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const lyric = event.target.lyric.value;
      const singers = tmp.getAll('singer');

      let avatar = null;
      if (avatars && avatars.length > 0) {
        avatar = avatars[0].file;
      }

      let audio = null;
      if (audios && audios.length > 0) {
        audio = audios[0].file;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("lyric", lyric);
      formData.append("singers", JSON.stringify(singers));
      formData.append("avatar", avatar);
      formData.append("audio", audio);

      const token = localStorage.getItem("adminToken");
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/song/edit/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
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
  }

  useEffect(() => {
    if (!songDetail) return;

    const validation = new JustValidate('#song-edit-form');

    validation
      .addField('#name', [
        {
          rule: 'required',
          errorMessage: 'Tên bắt buộc!'
        },
      ])
      .addField('#category', [
        {
          rule: 'required',
          errorMessage: 'Danh mục bắt buộc!'
        },
      ])
      .addField('[name="singer"]', [
        {
          validator: () => {
            const checkboxes = document.querySelectorAll('input[name="singer"]');
            return Array.from(checkboxes).some((cb) => (cb as HTMLInputElement).checked);
          },
          errorMessage: 'Phải chọn ít nhất 1 ca sĩ!',
        },
      ], {
        errorsContainer: '#singers',
        errorLabelCssClass: 'text-red-500 text-[13px] mt-[6px] block',
      })
      .onSuccess(() => setIsValid(true))
      .onFail(() => setIsValid(false))
  }, [songDetail]);

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
      <Toaster/>
      <form id="song-edit-form" className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor="name" className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên bài hát</label>
            <input id="name" type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={songDetail && songDetail.name} />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor="category" className="text-[14px] font-[600px] text-dark mb-[11px] block">Danh mục cha</label>
            <select id="category" className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">-- Chọn danh mục --</option>
              {categoryTree && categoryTree.length > 0 && renderOption(categoryTree)}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label htmlFor="position" className="text-[14px] font-[600px] text-dark mb-[11px] block">Vị trí</label>
            <input id="position" type="number" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={songDetail && songDetail.position} />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor="status" className="text-[14px] font-[600px] text-dark mb-[11px] block">Trạng thái</label>
            <select id="status" className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
            </select>
          </div>
        </div>
        <div className="mb-[20px] sm:mb-[40px] flex flex-col sm:flex-row gap-[15px] sm:gap-[30px]">
          <div className="w-full sm:w-[48%]" id="singers">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Ca sĩ</label>
            <div className="h-[150px] py-[18px] px-[23px] bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5] overflow-y-scroll flex flex-col gap-[10px]">
              {singerList && singerList.length > 0 && singerList.map((item, index) => (
                <div className="flex items-center gap-[10px]" key={index}>
                  <input
                    name="singer"
                    id={item.id}
                    type="checkbox"
                    className="w-[18px] h-[18px]"
                    value={item.id}
                    onChange={() => { }}
                    defaultChecked={songDetail.singers.includes(item.id)}
                  />
                  <label htmlFor={item.id} className="text-[14px] font-[600] text-dark">{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="avatar" className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh bài hát</label>
            <FilePond
              name="avatar"
              allowMultiple={false}
              allowRemove={true}
              acceptedFileTypes={["image/*"]}
              labelIdle="+"
              files={avatars}
              onupdatefiles={setAvatars}
              className="w-[150px] h-[150px]"
            />
          </div>
          <div>
            <label htmlFor="audio" className="text-[14px] font-[600px] text-dark mb-[11px] block">File bài hát</label>
            <FilePond
              name="audio"
              allowMultiple={false}
              allowRemove={true}
              acceptedFileTypes={['audio/*']}
              labelIdle="+"
              files={audios}
              onupdatefiles={setAudios}
              className="w-[150px] h-[150px]"
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <label htmlFor="lyric" className="text-[14px] font-[600px] text-dark mb-[11px] block">Lời bài hát</label>
          <textarea id="lyric" className="w-full h-[300px] py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" defaultValue={songDetail && songDetail.lyric} />
        </div>
        <div className="w-full flex justify-center mb-[30px]">
          <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Chỉnh sửa"}
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Link href='/admin/song/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
        </div>
      </form>
    </>
  );
}