import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

export const Play = () => {
    return (
        <>
            <div className="bg-[#212121] fixed bottom-0 left-0 z-[999] py-[20px] w-[100%] border-t-[1px] border-t-solid border-[#494949] hidden play-audio">
                <audio className="hidden inner-audio">
                    <source src="/"/>
                </audio>
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left */}
                    <div className="flex gap-[13px]">
                        <img src="/Rectangle15.png" />
                        <div>
                            <div className="text-white text-[15px] font-[700px]">Cô Phòng</div>
                            <div className="text-[#FFFFFF70] text-[12px] font-[700px]">Hồ Quang Hiếu, Huỳnh Văn</div>
                        </div>
                    </div>
                    {/* Mid */}
                    <div className="flex-1 mx-[66px]">
                        <div className="text-white flex justify-center gap-[52px]">
                            <button>
                                <MdSkipPrevious />
                            </button>
                            <button>
                                <FaPlay />
                            </button>
                            <button>
                                <MdSkipNext />
                            </button>
                        </div>
                        <div className="relative">
                            <div className="h-[4px] w-[80%] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[13px]"></div>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                defaultValue={80}
                                className="w-full h-[4px] bg-[#FFFFFF0A] appearance-none rounded-[50px] cursor-pointer range-sm"
                            />
                        </div>
                    </div>
                    {/* Right */}
                    <div className="flex items-end gap-[6px]">
                        <button>
                            <FaVolumeUp className="text-white" />
                        </button>
                        <div className="relative">
                            <div className="h-[4px] w-[80%] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[13px]"></div>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                defaultValue={80}
                                className="w-full h-[4px] bg-[#FFFFFF0A] appearance-none rounded-[50px] cursor-pointer range-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}