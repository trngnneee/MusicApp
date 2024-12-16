import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bài hát ưu thích",
  description: "Nghe nhạc trực tuyến",
};

export default function WishListPage() {
  const data = [
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "Hồ Quang Hiếu, Huỳnh Vân",
      listener: 24500,
      time: "4:32",
      link: `#`
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "abc",
      listener: 24500,
      time: "4:32",
      link: `#`
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "bc",
      listener: 24500,
      time: "4:32",
      link: `#`
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "Hồ Quang Hiếu, Huỳnh Vân",
      listener: 24500,
      time: "4:32",
      link: `#`
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "abc",
      listener: 24500,
      time: "4:32",
      link: `#`
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "bc",
      listener: 24500,
      time: "4:32",
      link: `#`
    },
  ]
  
  return (
    <>
      <Title
        title="Bài Hát Yêu Thích"
      />
      <div>
        {data.map((item, index) => (
          <SongItem2
            key={index}
            item={item}
          />
        ))}
      </div>
    </>
  );
}