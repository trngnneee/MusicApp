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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CategoryDetailPage(props: any) {

  // Card Information
  const { id } = await props.params;
  let cardInfor = {};
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSection: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (data.categoryId === id) {
        let singerList = "";
        data.singerId.forEach((id, index) => {
          onValue(ref(dbFirebase, 'singers/' + id), (itemSinger) => {
            const dataSinger = itemSinger.val();
            if (index != data.singerId.length - 1) singerList += dataSinger.title + ", ";
            else singerList += dataSinger.title;
          })
        })
        dataSection.push({
          id: key,
          img: data.image,
          title: data.title,
          singer: singerList,
          listener: data.listen,
          link: `/songs/${key}`,
          time: "4:32",
          audio: data.audio
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
