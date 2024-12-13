import { CardItem } from "@/app/components/CardItem/CardItem";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default function SingerCategoryPage() {
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
      <Title
        title="Danh Sách Ca Sĩ"
      />
      <div className="grid grid-cols-5 gap-[20px]">
        {dataSection2.map((item, index) => (
          <CardItem
            item={item}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
