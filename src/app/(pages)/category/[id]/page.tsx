import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default function CategoryDetailPage() {
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
  
  const cardInfor = {
    img: "/card1.svg",
    title: "Nhạc Trẻ",
    content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ, được Zing MP3 tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục."
  }

  return (
    <>
      {/* Section1 */}
      <CardInfor
        item={cardInfor}
      />
      {/* Section2 */}
      <div>
        <Title
          title="Danh Sách Bài Hát"
        />
        <div>
          {data.map((item, index) => (
            <SongItem2
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
