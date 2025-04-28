import { BsMusicPlayer } from "react-icons/bs";

export const Header = () => {
  return (
    <>
      <div className="border-b-[1px] border-b-[#E0E0E0] py-[22px] bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <BsMusicPlayer className="text-[30px]" />
            <div className="font-[800] text-[24px]">Music App Admin</div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="rounded-[50%] overflow-hidden">
              <img src="/adminAvatar.png" className="w-full h-full object-cover"/>
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="font-[700] text-[14px] text-dark">Le Van A</div>
              <div className="font-[600] text-[12px] text-dark">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}