import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { Wishlist } from "./wishlist";

export const metadata: Metadata = {
  title: "Bài hát ưu thích",
  description: "Nghe nhạc trực tuyến",
};

export default function WishListPage() {
  return (
    <>
      <Title
        title="Bài Hát Yêu Thích"
      />
      <Wishlist/>
    </>
  );
}