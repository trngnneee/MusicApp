import Link from "next/link";
import { PlayButton } from "../Button/PlayButton";
import { HeartButton } from "../Button/HeartButton";
import { AddPlayListButton } from "../Button/AddPlaylistButton";

export const SongItem = (props: {item: any}) => {
    const {item} = props;
    return (
        <>
            <div className="mb-[12px]">
                <div className="flex justify-between items-center bg-[#212121] p-[10px] rounded-[15px]">
                    <img
                        src={item.img}
                        className="w-[76px] h-auto"
                    />
                    <Link href={item.link} className="flex flex-col flex-1 ml-[10px]">
                        <div className="text-white font-[600] text-[16px] mb-[5px]">{item.title}</div>
                        <div className="text-[#FFFFFF80] font-[400] text-[12px] mb-[8px]">{item.singer}</div>
                        <div className="text-white font-[400] text-[12px]">{item.listener.toLocaleString()} lượt nghe</div>
                    </Link>
                    <div className="flex gap-[10px]">
                        <PlayButton item={item}/>
                        <HeartButton item={item}/>
                        <AddPlayListButton item={item}/>
                    </div>
                </div>
            </div>
        </>
    );
}