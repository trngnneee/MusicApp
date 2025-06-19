import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { DataCardInfor } from "./DataCardInfor";
import { DataSection } from "./DataSection";

export const metadata: Metadata = {
  title: "Chi tiết danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CategoryDetailPage(props: any) {
  const { slug } = await props.params;

  return (
    <>
      <DataCardInfor
        slug={slug}
      />
      <div>
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
