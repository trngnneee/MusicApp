import { CardItem } from "@/app/components/CardItem/CardItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default function SingerDetailPage() {
  const cardInfor = {
    img: "/card1.svg",
    title: "Sơn Tùng MTP",
    content: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ, được Zing MP3 tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục."
  }

  return (
    <>
      <h1>Trang chi tiết ca sĩ</h1>
    </>
  );
}
