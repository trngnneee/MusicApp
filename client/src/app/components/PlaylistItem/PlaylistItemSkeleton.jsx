export const PlaylistItemSkeleton = () => {
  return (
    <div className="bg-[#1a1a1a34] p-[5px] sm:p-[20px] rounded-[20px] border-[1px] border-[grey] relative animate-pulse">
      <div className="flex items-center gap-[20px]">
        <div className="w-[50px] sm:w-[100px] h-[50px] sm:h-[100px] overflow-hidden aspect-square rounded-[10px] bg-[#333]"></div>

        <div className="flex flex-col gap-[6px]">
          <div className="h-[14px] sm:h-[20px] w-[100px] sm:w-[150px] bg-[#333] rounded"></div>
          <div className="h-[10px] sm:h-[14px] w-[80px] sm:w-[120px] bg-[#333] rounded"></div>
          <div className="h-[8px] sm:h-[12px] w-[60px] sm:w-[100px] bg-[#333] rounded"></div>
        </div>
      </div>

      <div className="absolute bottom-[10px] right-[10px]">
        <div className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full bg-[#333]"></div>
      </div>
    </div>
  );
};
