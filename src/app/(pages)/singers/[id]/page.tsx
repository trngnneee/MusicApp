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
  const { id } = await props.params;
  return (
    <>
      <div className="mb-[30px]">
        <DataCardInfor
          id={id}
        />
      </div>
      <Title
        title="Danh Sách Bài Hát"
      />
      <div>
        <SongList
          id={id}
        />
      </div>
    </>
  );
}
