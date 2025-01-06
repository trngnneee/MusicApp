import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { dbFirebase } from "@/app/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default async function CategoryDetailPage(props: any) {

  // Card Information
  const { id } = await props.params;
  var cardInfor = {};
  onValue(ref(dbFirebase, 'categories/' + id), (data) => {
    const dataCardInfor = data.val();
    cardInfor = {
      img: dataCardInfor.image,
      title: dataCardInfor.title,
      content: dataCardInfor.description
    };
  })
  // End Card Information

  // Song data
  const dataSection: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      console.log(data);

      if (data.categoryId === id) {
        onValue(ref(dbFirebase, 'singers/' + data.singerId[0]), (itemSinger) => {
          const dataSinger = itemSinger.val();
          dataSection.push({
            id: key,
            img: data.image,
            title: data.title,
            singer: dataSinger.title,
            listener: data.listen,
            link: `/songs/${key}`,
            time: "4:32",
            audio: data.audio
          })
        })
      }
    })
  });
  // End Song data

  return (
    <>
      {/* Section1 */}
      <CardInfor
        item={cardInfor}
      />
      {/* Section2 */}
      <div>
        <Title
          title="Danh Sách Bài Hát"
        />
        <div>
          {dataSection.map((item, index) => (
            <div data-aos="fade-up" key={index}>
              <SongItem2
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
