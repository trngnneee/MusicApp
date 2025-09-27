export const PlayLeft = () => {
    return (
        <>
            <div className="flex gap-[5px] sm:gap-[13px] items-center ml-[15px] md:ml-[0px]">
                <div className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px]">
                    <img
                        src="/"
                        className="inner-image w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div className="text-white text-[10px] md:text-[15px] font-[700px] inner-title line-clamp-1">

                    </div>
                    <div className="text-[#FFFFFF70] text-[10px] md:text-[12px] font-[700px] inner-singer line-clamp-1">

                    </div>
                </div>
            </div>
        </>
    );
}