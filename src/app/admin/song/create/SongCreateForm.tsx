"use client"

import Link from "next/link";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from "react";

registerPlugin(FilePondPluginImagePreview);

export const SongCreateForm = () => {
  const [files, setFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  
  return (
    <>
      <form className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]">
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Tên bài hát</label>
            <input type="text" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Danh mục cha</label>
            <select className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]">
              <option value="">-- Chọn danh mục --</option>
              <option value="">Danh mục 1</option>
              <option value="">Danh mục 2</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[15px] sm:mb-[30px]">
          <div className="w-full sm:w-[48%]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Vị trí</label>
            <input type="number" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Trạng thái</label>
            <select className="block w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]">
              <option value="">Hoạt động</option>
              <option value="">Tạm dừng</option>
            </select>
          </div>
        </div>
        <div className="mb-[20px] sm:mb-[40px] flex flex-col sm:flex-row gap-[15px] sm:gap-[30px]">
          <div className="w-full sm:w-[48%]">
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Ca sĩ</label>
            <div className="h-[150px] py-[18px] px-[23px] bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5] overflow-y-scroll flex flex-col gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <label className="text-[14px] font-[600] text-dark">DangRangTo</label>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Ảnh bài hát</label>
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
          <div>
            <label className="text-[14px] font-[600px] text-dark mb-[11px] block">File bài hát</label>
            <FilePond
              files={audioFiles}
              onupdatefiles={setAudioFiles}
              allowMultiple={false}
              acceptedFileTypes={['audio/mpeg', 'audio/mp3']}
              name="files"
              labelIdle={`<div class="flex flex-col items-center justify-center w-full h-full text-dark text-[16px] font-medium text-center">
                Kéo thả hoặc <u class="cursor-pointer">Chọn file âm thanh</u>
              </div>`}              
              className="w-full sm:w-[400px] h-[150px]"
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Lời bài hát</label>
          <textarea className="w-full h-[300px] py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
        </div>
        <div className="w-full flex justify-center mb-[30px]">
          <button className="px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
            Tạo mới
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Link href='/admin/song/list'><u className="text-[18px] font-[700] text-[#4880FF]">Quay lại danh sách</u></Link>
        </div>
      </form>
    </>
  );
}