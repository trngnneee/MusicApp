export const SongItemSkeleton = () => {
  return (
    <div className="mb-[12px]">
      <div className="flex gap-[5px] sm:gap-[15px] items-center bg-[#212121] px-[10px] py-[5px] xl:py-[10px] rounded-[15px] animate-pulse">
        <div className="w-[50px] lg:w-[50px] xl:w-[60px] h-[50px] lg:h-[50px] xl:h-[60px] bg-gray-700 rounded-[10px]" />

        <div className="flex flex-col flex-1 ml-[5px] sm:ml-[10px] p-0">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>

        <div className="flex gap-[10px] items-center">
          <div className="w-[35px] h-[35px] bg-gray-700 rounded-full" />
          <div className="w-[25px] h-[25px] bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};