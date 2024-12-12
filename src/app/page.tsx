import { Metadata } from "next";
import { Title } from "./components/Title/Title";
import { CardItem } from "./components/CardItem/CardItem";
import { SongItem } from "./components/SongItem/SongItem";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nghe nhạc trực tuyến",
};

export default function Home() {
  const dataSection1 = [
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "Hồ Quang Hiếu, Huỳnh Vân",
      listener: 24500
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "abc",
      listener: 24500
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "bc",
      listener: 24500
    },
  ]

  const dataSection2 = [
    {
      img: "/card1.svg",
      title: "Nhạc trẻ",
      content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
      link: "#"
    },
    {
      img: "/card1.svg",
      title: "Nhạc trẻ",
      content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
      link: "#"
    },
    {
      img: "/card1.svg",
      title: "Nhạc trẻ",
      content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
      link: "#"
    },
    {
      img: "/card1.svg",
      title: "Nhạc trẻ",
      content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
      link: "#"
    },
    {
      img: "/card1.svg",
      title: "Nhạc Bolero",
      content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
      link: "#"
    },

  ]

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
              {dataSection1.map((item, index) => (
                <SongItem
                  item={item}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Section2 */}
      <div className="mb-[30px]">
        <Title title="Danh Mục Nổi Bật" />
        <div className="grid grid-cols-5 gap-[20px]">
          {dataSection2.map((item, index) => (
            <CardItem
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* Section3 */}
      <div className="mb-[30px]">
        <Title title="Ca Sĩ Nổi Bật" />
        <div className="grid grid-cols-5 gap-[20px]">
            {/* Đổ data vào đây */}
        </div>
      </div>
    </>
  );
}
