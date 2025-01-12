import Link from "next/link";
import { PlayButton } from "../Button/PlayButton";
import { HeartButton } from "../Button/HeartButton";
import { AddPlayListButton } from "../Button/AddPlaylistButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SongItem2 = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <div className="mb-[12px]">
                <div className="flex justify-between items-center bg-[#212121] p-0 lg:px-[10px] py-[10px] rounded-[15px]">
                    <div className="flex items-center gap-[8px] sm:gap-[20px] ml-[10px] md:ml-[20px]">
                        <PlayButton
                            item={item}
                        />
                        <img
                            src={item.img}
                            className="w-[40px] sm:w-[60px] xl:w-[76px] h-auto"
                        />
                        <Link href={item.link} className="text-white font-[600] text-[9px] sm:text-[12px] lg:text-[14px] xl:text-[16px] mr-[5px] flex-1 line-clamp-1">{item.title}</Link>
                    </div>
                    <div className="flex gap-[5px] md:gap-[15px] items-center">
                        <div className="text-white font-[400] text-[8px] sm:text-[11px] lg:text-[14px] w-[70px] sm:w-[100px] lg:w-[160px] xl:w-[200px] p-0 flex gap-[5px] justify-end">
                            {<div>{item.singer}</div>}
                        </div>
                        {/* <div className="hidden md:block font-[400] text-[8px] sm:text-[11px] lg:text-[14px] text-white">{item.time}</div> */}
                        <HeartButton
                            item={item}
                        />
                        <AddPlayListButton
                            item={item}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}