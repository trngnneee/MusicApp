import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { SearchResult } from "./searchResult";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Nghe nhạc trực tuyến",
};

export default function SearchPage() {
  return (
    <>
      <Title
        title="Kết Quả Tìm Kiếm"
      />
      <Suspense>
        <SearchResult/>
      </Suspense>
    </>
  );
}
