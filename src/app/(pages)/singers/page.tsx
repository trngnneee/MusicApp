import { CardItem } from "@/app/components/CardItem/CardItem";
import { Title } from "@/app/components/Title/Title";
import { dbFirebase } from "@/app/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default function SingerCategoryPage() {
  const dataSection: any[] = []
  const singerRef = ref(dbFirebase, 'singers');
  onValue(singerRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      dataSection.push({
        id: key,
        img: data.image,
        title: data.title,
        content: data.description,
        link: `/singers/${key}`
      })
    })
  });

  return (
    <>
      <Title
        title="Danh Sách Ca Sĩ"
      />
      <div className="grid grid-cols-5 gap-[20px]">
        {dataSection.map((item, index) => (
          <div data-aos="fade-up" key={index}>
            <CardItem
              item={item}
            />
          </div>
        ))}
      </div>
    </>
  );
}
