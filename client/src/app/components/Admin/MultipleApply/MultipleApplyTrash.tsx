export const MultipleApplyTrash = () => {
  return (
    <>
      <ul className="flex items-center">
        <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
          <select className="text-[14px] font-[700] text-dark outline-none">
            <option value="">-- Hành động --</option>
            <option value="active">Phục hồi</option>
            <option value="delete">Xóa vĩnh viễn</option>
          </select>
        </li>
        <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
          <button className="text-[#EA0234] text-[14px] font-[700]">
            Áp dụng
          </button>
        </li>
      </ul>
    </>
  );
}