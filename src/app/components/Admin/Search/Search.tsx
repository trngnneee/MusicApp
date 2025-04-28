import { IoSearch } from "react-icons/io5";

export const Search = () => {
  return (
    <>
      <div className="flex gap-[15px] p-[25px] w-[366px] bg-white border-[1px] border-[#E2E2E2] rounded-[14px]">
        <IoSearch className="text-[#979797] text-[20px]"/>
        <input type="text" placeholder="Tìm kiếm" className="text-[#979797] text-[14px] font-[700] flex-1 outline-none translate-y-[1px]"/>
      </div>
    </>
  );
}