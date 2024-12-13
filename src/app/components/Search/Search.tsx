import { FaSearch } from "react-icons/fa";
export const Search = () => {
    return (
        <>
            <div className="top-[20px] left-[20px] sticky bg-[#212121] rounded-[50px] py-[15px] px-[30px] z-[999]">
                <div className="text-white flex items-center gap-[20px]">
                    <FaSearch />
                    <input className="text-[16px] font-[500] bg-transparent w-[100%] border-none outline-none" placeholder="Tìm kiếm..." />
                </div>
            </div>
        </>
    );
}