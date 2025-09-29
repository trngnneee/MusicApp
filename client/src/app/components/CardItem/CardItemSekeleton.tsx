export const CardItemSkeleton = () => {
  return (
    <div className="flex flex-col p-[5px] sm:p-[10px] rounded-[10px] animate-pulse">
      <div className="w-full aspect-square bg-gray-700 rounded-[10px] mb-[10px]" />
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-700 rounded w-1/2" />
    </div>
  );
};
