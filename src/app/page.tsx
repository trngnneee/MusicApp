import { Metadata } from "next";
import { Title } from "./components/Title/Title";
import { DataSection1 } from "./components/HomePageDataSection/DataSection1";
import { DataSection2 } from "./components/HomePageDataSection/DataSection2";
import { DataSection3 } from "./components/HomePageDataSection/DataSection3";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nghe nhạc trực tuyến",
};

export default function Home() {
  return (
    <>
      {/* Section1 */}
      <div>
        <div className="flex gap-[21px]">
          <div
            className="w-[534px] h-[361px] flex items-center gap-[34px] px-[30px] pt-[40px]"
            style={{ backgroundImage: "url('/background1.png')" }}
          >
            <div className="w-[50%]">
              <div className="font-[700] text-[32px] text-white mb-[6px]">Nhạc EDM</div>
              <div className="font-[400] text-[14px] text-white">Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ</div>
            </div>
            <div className="h-full w-[50%]">
              <img
                src="/human1.svg"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-white font-[700] text-[24px] mb-[20px]">Nghe nhiều</div>
            <div>
              <DataSection1/>
            </div>
          </div>
        </div>
      </div>
      {/* Section2 */}
      <div className="mb-[30px]">
        <Title title="Danh Mục Nổi Bật" />
        <DataSection2/>
      </div>
      {/* Section3 */}
      <div className="mb-[30px]">
        <Title title="Ca Sĩ Nổi Bật" />
        <DataSection3/>
      </div>
    </>
  );
}
