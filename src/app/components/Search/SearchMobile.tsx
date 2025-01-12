import { MenuListButton } from "../Button/MenuListButton";
import { SearchButton } from "../Button/SearchButton";

export const SearchMobile = () => {
    return (
        <>
            <div className="flex md:hidden justify-between mt-[10px] text-[20px] sm:text-[25px] text-white mb-[5px] px-[5px]">
                <MenuListButton/>
                <SearchButton/>
            </div>
        </>
    );
}