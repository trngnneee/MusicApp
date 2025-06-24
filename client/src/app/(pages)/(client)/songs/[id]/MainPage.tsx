"use client"

import { Title } from "@/app/components/Title/Title";
import { DataCardInfor } from "./DataCardInfor";
import { Lyrics } from "./Lyrics";
import { SongList } from "./SongList";
import { useState } from "react";

export const MainPage = (props: {
  id: string
}) => {
  const { id } = props;
  const [songDetail, setSongDetail] = useState<any>({});

  return (
    <>
      {/* Section1 */}
      <DataCardInfor
        id={id}
        onFetchSuccess={setSongDetail}
      />
      {/* Section2 */}
      <Lyrics
        lyric={songDetail && songDetail.lyric}
      />
      {/* Section3 */}
      <Title
        title="Bài Hát Cùng Danh Mục"
      />
      {songDetail && (
        <SongList
          id={songDetail && songDetail.category}
        />
      )}
    </>
  );
}