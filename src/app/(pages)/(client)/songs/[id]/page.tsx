import { Title } from "@/app/components/client/Title/Title";
import { Metadata } from "next";
import { DataCardInfor } from "./DataCardInfor";
import { Lyrics } from "./Lyrics";
import { SongList } from "./SongList";

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Nghe nhạc trực tuyến",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SongDetailPage(props: any) {
  const { id } = await props.params;

  return (
    <>
      {/* Section1 */}
      <DataCardInfor
        id={id}
      />
      {/* Section2 */}
      <Lyrics
        id={id}
      />
      {/* Section3 */}
      <Title
        title="Bài Hát Cùng Danh Mục"
      />
      <SongList
        id={id}
      />
    </>
  );
}
