import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { DataCardInfor } from "./DataCardInfor";
import { SongList } from "./SongList";

export const metadata: Metadata = {
  title: "Chi tiết ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SingerDetailPage(props: any) {
  const { slug } = await props.params;
  return (
    <>
      <div className="mb-[10px] sm:mb-[30px]">
        <DataCardInfor
          slug={slug}
        />
      </div>
      <Title
        title="Danh Sách Bài Hát"
      />
      <div>
        <SongList
          slug={slug}
        />
      </div>
    </>
  );
}
