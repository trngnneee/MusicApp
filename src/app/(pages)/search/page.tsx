import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Nghe nhạc trực tuyến",
};

export default function SearchPage() {
  const data = [
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "Hồ Quang Hiếu, Huỳnh Vân",
      listener: 24500,
      time: "4:32"
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "abc",
      listener: 24500,
      time: "4:32"
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "bc",
      listener: 24500,
      time: "4:32"
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "Hồ Quang Hiếu, Huỳnh Vân",
      listener: 24500,
      time: "4:32"
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "abc",
      listener: 24500,
      time: "4:32"
    },
    {
      img: "/Rectangle15.png",
      title: "Cô Phòng",
      singer: "bc",
      listener: 24500,
      time: "4:32"
    },
  ]
  
  return (
    <>
      <Title
        title="Kết Quả Tìm Kiếm"
      />
      <div>
        {data.map((item, index) => (
          <SongItem2
            item={item}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
