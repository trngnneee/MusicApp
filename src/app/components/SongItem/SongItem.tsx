import Link from "next/link";
import { PlayButton } from "../Button/PlayButton";
import { HeartButton } from "../Button/HeartButton";
import { AddPlayListButton } from "../Button/AddPlaylistButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SongItem = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <div className="mb-[12px]">
                <div className="flex gap-[10px] sm:gap-[20px] items-center bg-[#212121] px-[10px] py-[5px] xl:py-[10px] rounded-[15px]">
                    <img
                        src={item.img}
                        className="w-[76px] lg:w-[50px] xl:w-[76px] h-auto"
                    />
                    <Link href={item.link} className="flex flex-col flex-1 ml-[10px]">
                        <div className="text-white font-[600] text-[8px] sm:text-[10px] lg:text-[14px] xl:text-[16px] mb-[2px] xl:mb-[5px]">{item.title}</div>
                        <div className="text-[#FFFFFF80] font-[400] text-[8px] sm:text-[10px] xl:text-[12px] mb-[2px] xl:mb-[8px]">{item.singer}</div>
                        <div className="text-white font-[400] text-[5px] sm:text-[10px] xl:text-[12px]">{item.listener.toLocaleString()} lượt nghe</div>
                    </Link>
                    <div className="flex gap-[10px] items-center">
                        <div className="">
                            <PlayButton item={item} />
                        </div>
                        <div className="block lg:hidden xl:block">
                            <HeartButton item={item} />
                        </div>
                        <div className="block lg:hidden xl:block">
                            <AddPlayListButton item={item} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}