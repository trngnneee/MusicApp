import { Metadata } from "next";
import { Title } from "../../../components/Title/Title";
import { DataSection1 } from "./DataSection1";
import { DataSection2 } from "./DataSection2";
import { DataSection3 } from "./DataSection3";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nghe nhạc trực tuyến",
};

export default function Home() {
  return (
    <>
      {/* Section1 */}
      <div>
        <div className="flex gap-[15px] xl:gap-[20px] mb-[15px] lg:mb-[30px]">
          <Link
            href="/category/nhac-hiphop"
            className="w-full lg:w-[400px] xl:w-[534px] h-auto lg:h-[270px] xl:h-[361px] flex items-center gap-[20px] xl:gap-[34px] px-[20px] pt-[40px] rounded-[20px]"
            style={{
              backgroundImage: "url('/background1.png')",
              backgroundSize: "cover"
            }}
          >
            <div className="w-[50%]">
              <div className="font-[700] text-[20px] sm:text-[25px] xl:text-[32px] text-white mb-[6px]">Nhạc Hiphop</div>
              <div className="font-[400] text-[8px] sm:text-[12px] xl:text-[14px] text-white">
                <div className="text-[12px] xl:text-[16px] font-bold">Nhạc Hiphop mới nhất 2025</div>
                <div>🔥 Không chỉ nghe – mà còn cảm</div>
                <div>🔥 Không chỉ chill – mà phải real</div>
                Vì đây không chỉ là âm nhạc, đây là hip-hop life!
              </div>
            </div>
            <div className="h-full w-[50%]">
              <img
                src="/human1.svg"
                className="w-full h-full object-cover block"
              />
            </div>
          </Link>
          <div className="flex-1 hidden lg:block">
            <div className="text-white font-[700] text-[20px] xl:text-[24px] mb-[10px] xl:mb-[20px]">Nghe nhiều</div>
            <div className="">
              <DataSection1 />
            </div>
          </div>
        </div>
        <div className="block lg:hidden mb-[15px] lg:mb-[30px]">
          <Title
            title="Nghe nhiều"
            className="mt-[10px] mb-[20px]"
          />
          <div>
            <DataSection1 />
          </div>
        </div>
      </div>
      {/* Section2 */}
      <div className="mb-[15px] lg:mb-[30px]">
        <Title title="Danh Mục Nổi Bật" />
        <DataSection2 />
      </div>
      {/* Section3 */}
      <div className="mb-[15px] lg:mb-[30px]">
        <Title title="Ca Sĩ Nổi Bật" />
        <DataSection3 />
      </div>
    </>
  );
}
