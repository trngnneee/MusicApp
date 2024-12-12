import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Nghe nhạc trực tuyến",
};

export default function SearchPage() {
  return (
    <>
      <h1 className="font-bold text-[36px]">Trang kết quả tìm kiếm</h1>
    </>
  );
}
