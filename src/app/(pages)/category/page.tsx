import { CardItem } from "@/app/components/CardItem/CardItem";
import { Title } from "@/app/components/Title/Title";
import { dbFirebase } from "@/app/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default function CategoryPage() {
  const dataSection: any[] = []
  const categoryRef = ref(dbFirebase, 'categories');
  onValue(categoryRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      dataSection.push({
        id: key,
        img: data.image,
        title: data.title,
        content: data.description,
        link: `/category/${key}`
      })
    })
  });

  return (
    <>
      <div>
        <Title
          title="Danh Mục Bài Hát"
        />
        <div className="grid grid-cols-5 gap-[20px]">
          {dataSection.map((item, index) => (
            <CardItem
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
