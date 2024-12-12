import { CardItem } from "@/app/components/CardItem/CardItem";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default function CategoryPage() {
  const data = [
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
      <div>
        <Title
          title="Danh Mục Bài Hát"
        />
        <div className="grid grid-cols-5 gap-[20px]">
          {data.map((item, index) => (
            <CardItem
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
