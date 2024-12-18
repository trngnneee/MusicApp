import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { PlayButton } from "../Button/PlayButton";

export const SongItem2 = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <div className="mb-[12px]">
                <div className="flex justify-between items-center bg-[#212121] p-[10px] rounded-[15px]">
                    <div className="flex items-center gap-[12px] ml-[23px]">
                        <PlayButton
                            item={item}
                        />
                        <img
                            src={item.img}
                            className="w-[76px] h-auto"
                        />
                        <Link href={item.link} className="text-white font-[600] text-[16px">{item.title}</Link>
                    </div>
                    <div className="text-white font-[400] text-[14px]">{item.singer}</div>
                    <div className="flex gap-[18px] mr-[23px]">
                        <div className="font-[400] text-[14px] text-white">{item.time}</div>
                        <button className="text-[#00ADEF]">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}