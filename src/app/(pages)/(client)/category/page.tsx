import { Title } from "@/app/components/client/Title/Title";
import { Metadata } from "next";
import { DataSection } from "./DataSection";

export const metadata: Metadata = {
  title: "Danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default function CategoryPage() {
  return (
    <>
      <div>
        <Title
          title="Danh Mục Bài Hát"
        />
        <DataSection/>
      </div>
    </>
  );
}
