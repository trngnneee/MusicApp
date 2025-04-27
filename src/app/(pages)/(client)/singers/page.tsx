import { Title } from "@/app/components/client/Title/Title";
import { Metadata } from "next";
import { DataSection } from "./DataSection";

export const metadata: Metadata = {
  title: "Danh mục ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default function SingerCategoryPage() {
  return (
    <>
      <Title
        title="Danh Sách Ca Sĩ"
      />
      <DataSection/>
    </>
  );
}
