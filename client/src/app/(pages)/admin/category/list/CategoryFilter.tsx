import { FaUndoAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

export const CategoryFilter = (props: {
  status: string,
  setStatus: (value: string) => void,
  createdBy: string,
  setCreatedBy: (value: string) => void,
  startDate: string,
  setStartDate: (value: string) => void,
  endDate: string,
  setEndDate: (value: string) => void,
  adminAccountList: any[],
  handleClearFilter: () => void
}) => {
  const { status, setStatus, createdBy, setCreatedBy, startDate, setStartDate, endDate, setEndDate, adminAccountList, handleClearFilter } = props;

  return (
    <>
      <div className="w-full overflow-x-auto">
        <ul className="flex items-center mt-[30px] min-w-[750px] w-fit">
          <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
            <FiFilter className="text-dark" />
            <div className="text-[14px] font-[700] text-dark truncate">Bộ Lọc</div>
          </li>
          <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
            <select
              className="text-[14px] font-[700] text-dark outline-none"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
            </select>
          </li>
          <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
            <select
              className="text-[14px] font-[700] text-dark outline-none"
              value={createdBy}
              onChange={(event) => setCreatedBy(event.target.value)}
            >
              <option value="">Người tạo</option>
              {adminAccountList && adminAccountList.length && adminAccountList.map((item, index) => (
                <option key={index} value={item.id}>{item.fullName}</option>
              ))}
            </select>
          </li>
          <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
            <input
              type="date"
              className="text-[12px] font-[700] text-dark outline-none"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <span className="text-[14px] font-[700] text-dark outline-none">-</span>
            <input
              type="date"
              className="text-[12px] font-[700] text-dark outline-none"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </li>
          <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
            <button
              className="flex items-center gap-[10px] text-[#EA0234] truncate"
              onClick={handleClearFilter}
            >
              <FaUndoAlt />
              <div className="text-[14px] font-[700]">Xóa bộ lọc</div>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}