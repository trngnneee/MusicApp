import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { CardItem } from "@/app/components/CardItem/CardItem";
import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { dbFirebase } from "@/app/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default async function SingerDetailPage(props: any) {
  // Card Infor
  const { id } = await props.params;
  var cardInfor = {};
  onValue(ref(dbFirebase, 'singers/' + id), (data) => {
    const dataCardInfor = data.val();
    cardInfor = {
      img: dataCardInfor.image,
      title: dataCardInfor.title,
      content: dataCardInfor.description
    };
  })
  // End Card Infor

  // Song List
  const dataSection: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (data.singerId.includes(id)) {
        onValue(ref(dbFirebase, 'singers/' + data.singerId[0]), (itemSinger) => {
          const dataSinger = itemSinger.val();
          dataSection.push({
            id: key,
            img: data.image,
            title: data.title,
            singer: dataSinger.title,
            listener: data.listen,
            time: "3:45",
            link: key,
            audio: data.audio
          })
        })
      }
    })
  });
  // End Song List

  return (
    <>
      <div className="mb-[30px]">
        <CardInfor
          item={cardInfor}
        />
      </div>
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
    </>
  );
}
