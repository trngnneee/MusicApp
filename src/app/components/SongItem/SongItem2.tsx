import Link from "next/link";
import { PlayButton } from "../Button/PlayButton";
import { HeartButton } from "../Button/HeartButton";
import { AddPlayListButton } from "../Button/AddPlaylistButton";

export const SongItem2 = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <div className="mb-[12px]">
                <div className="flex justify-between items-center bg-[#212121] p-[10px] rounded-[15px]">
                    <div className="flex items-center gap-[20px] ml-[23px]">
                        <PlayButton
                            item={item}
                        />
                        <img
                            src={item.img}
                            className="w-[76px] h-auto"
                        />
                        <Link href={item.link} className="text-white font-[600] text-[16px">{item.title}</Link>
                    </div>
                    <div className="flex gap-[18px] items-center">
                        <div className="text-white font-[400] text-[14px] w-[200px] mr-[20px] p-0 flex gap-[5px]">
                            {<div>{item.singer}</div>}
                        </div>
                        <div className="font-[400] text-[14px] text-white">{item.time}</div>
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