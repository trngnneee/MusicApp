import { Metadata } from "next";
import { Title } from "../../../components/Title/Title";
import { DataSection1 } from "./DataSection1";
import { DataSection2 } from "./DataSection2";
import { DataSection3 } from "./DataSection3";
import Link from "next/link";
import { Thumbnail } from "./Thumbnail";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nghe nhạc trực tuyến",
};

export default function Home() {
  return (
    <>
      {/* Section1 */}
      <div>
        <div className="flex gap-[15px] xl:gap-[20px] items-center">
          <Thumbnail/>
          <div className="flex-1 hidden lg:block">
            <div className="text-white font-[700] text-[20px] xl:text-[24px] mb-[10px]">Gợi ý cho bạn</div>
              <DataSection1 />
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
