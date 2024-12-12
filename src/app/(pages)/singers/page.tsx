import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default function SingerCategoryPage() {
  return (
    <>
      <h1 className="font-bold text-[36px]">Trang danh sách ca sĩ</h1>
    </>
  );
}
