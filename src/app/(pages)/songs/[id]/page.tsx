import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default function SongDetailPage() {
  const cardInfor = {
    img: "/Rectangle15.png",
    title: "Cô Phòng",
    content: "Hồ Quang Hiếu, Huỳnh Văn"
  }

  const lyrics = `Verse:
    Níu ngàn lời cũng không ngăn được
    Bàn chân bước đi không báo trước
    Có những điều cất riêng trong lòng
    Giờ bốn vách ngăn cùng cô phòng
    Trốn chạy rồi hàn huyên với men
    Cứ thế kết thân cùng ánh đèn
    Lối mòn ngày nào trên phố quen
    Vẫn đó dáng hình ngày người đến
    Pre:
    Rời xa, lòng đau, chết trong cơn u sầu
    Liệu rằng tình đời ai sẽ thấu
    Dĩ vãng xưa vẫn in sâu trong đầu
    (hah a hah)
    Chorus:
    Thời gian không thể xoá nhoà đôi ta
    Có chăng chỉ là mờ phai đi theo tháng năm
    Rồi khi tỉnh giấc mới chợt nhận ra
    Thật quá khó để quên đi một người
    Màn đêm u tối bao trùm không gian
    Nói thay tiếng lòng này từ lâu đã vỡ tan
    Thì ra duyên kiếp để mình gặp nhau
    Dạy nhau tốt hơn xong dành lại cho người sau…`;

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
      {/* Section1 */}
      <CardInfor
        item={cardInfor}
      />
      {/* Section2 */}
      <Title
        title="Lời Bài Hát"
      />
      <div className="bg-[#212121] rounded-[15px] p-[20px] text-white text-[14px] font-[500] whitespace-pre-line">
        {lyrics}
      </div>
      {/* Section3 */}
      <Title
        title="Bài Hát Cùng Danh Mục"
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
