import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bài hát ưu thích",
  description: "Nghe nhạc trực tuyến",
};

export default function WishListPage() {
  return (
    <>
      <h1 className="font-bold text-[36px]">Trang danh sách bài hát ưu thích</h1>
    </>
  );
}