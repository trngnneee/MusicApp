import { Metadata } from "next";
import { MainPage } from "./MainPage"

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Nghe nhạc trực tuyến",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SongDetailPage(props: any) {
  const { id } = await props.params;

  return (
    <>
      <MainPage
        id={id}
      />
    </>
  );
}
