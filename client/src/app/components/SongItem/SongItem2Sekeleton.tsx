export const SongItem2Skeleton = () => {
    return (
        <div className="mb-[5px] md:mb-[12px]">
            <div className="grid grid-cols-12 items-center bg-[#212121] px-[5px] sm:px-[15px] py-[5px] sm:py-[10px] rounded-[15px] gap-[10px] animate-pulse">
                <div className="col-span-2">
                    <div className="w-[40px] sm:w-[50px] xl:w-[60px] aspect-square rounded-[8px] bg-gray-700" />
                </div>

                <div className="col-span-2">
                    <div className="h-[10px] sm:h-[14px] xl:h-[16px] bg-gray-700 rounded mb-[4px] w-[80%]" />
                </div>

                <div className="col-span-6">
                    <div className="h-[8px] sm:h-[12px] bg-gray-700 rounded w-[60%]" />
                </div>

                <div className="col-span-2 flex justify-end items-center gap-[8px]">
                    <div className="w-[30px] sm:w-[40px] aspect-square rounded-full bg-gray-700" />
                    <div className="w-[20px] sm:w-[30px] aspect-square rounded-full bg-gray-700" />
                    <div className="w-[20px] sm:w-[30px] aspect-square rounded-full bg-gray-700" />
                </div>
            </div>
        </div>
    );
};
