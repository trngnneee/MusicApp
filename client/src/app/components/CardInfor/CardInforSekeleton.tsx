export const CardInforSkeleton = ({ className }) => {
    return (
        <div className={`flex items-center gap-[20px] animate-pulse ${className}`}>
            <div className="w-[120px] md:w-[180px] aspect-square rounded-[12px] bg-[#333]"></div>
            <div className="flex flex-col gap-[10px] flex-1">
                <div className="h-[25px] md:h-[35px] w-[150px] md:w-[250px] bg-[#333] rounded"></div>
                <div className="h-[14px] md:h-[18px] w-[200px] md:w-[300px] bg-[#333] rounded"></div>
                <div className="h-[14px] md:h-[18px] w-[100px] md:w-[200px] bg-[#333] rounded"></div>
            </div>
        </div>
    );
};
