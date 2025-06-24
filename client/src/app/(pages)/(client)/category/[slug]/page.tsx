import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { DataCardInfor } from "./DataCardInfor";
import { DataSection } from "./DataSection";

export const metadata: Metadata = {
  title: "Chi tiết danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default async function CategoryDetailPage(props: any) {
  const { slug } = await props.params;

  return (
    <>
      <DataCardInfor
        slug={slug}
      />
      <div className="mt-[30px]">
        <Title
          title="Danh Sách Bài Hát"
        />
        <DataSection
          slug={slug}
        />
      </div>
    </>
  );
}
