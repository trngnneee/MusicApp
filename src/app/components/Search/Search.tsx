"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
export const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSearch = (event: any) => {
        event.preventDefault();
        const keyword = event.target.keyword.value;
        router.push(`/search?keyword=${keyword}`);
    }

    // Lấy giá trị của ô input, gắn cho ô input là DefaultValue
    const defaultKeyword = searchParams.get("keyword") || "";

    return (
        <>
            <form 
                className="hidden md:block right-[15px] top-[30px] md:top-[20px] md:left-[20px] absolute md:sticky bg-[#212121] rounded-[50px] py-[15px] px-[30px] z-[999] search-box"
                onSubmit={handleSearch}
            >
                <div className="text-white flex items-center gap-[20px]">
                    <FaSearch />
                    <input 
                        className="text-[12px] md:text-[16px] font-[500] bg-transparent w-[100%] border-none outline-none" 
                        placeholder="Tìm kiếm..." 
                        type="text"
                        name="keyword"
                        defaultValue={defaultKeyword}
                    />
                </div>
            </form>
        </>
    );
}