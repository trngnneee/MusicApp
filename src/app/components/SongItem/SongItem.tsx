import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

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
                    <div className="flex flex-col flex-1 ml-[10px]">
                        <div className="text-white font-[600] text-[16px] mb-[5px]">{item.title}</div>
                        <div className="text-[#FFFFFF80] font-[400] text-[12px] mb-[8px]">{item.singer}</div>
                        <div className="text-white font-[400] text-[12px]">{item.listener.toLocaleString()} lượt nghe</div>
                    </div>
                    <div className="flex gap-[10px]">
                        <button className="bg-[#00ADEF] rounded-[50%] p-[8px] text-white">
                            <FaPlay />
                        </button>
                        <button className="bg-[#00ADEF] rounded-[50%] p-[8px] text-white">
                            <FaRegHeart />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}