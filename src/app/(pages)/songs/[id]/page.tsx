import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { SongItem2 } from "@/app/components/SongItem/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { dbFirebase } from "@/app/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default async function SongDetailPage(props: any) {

  // Card Information
  const { id } = await props.params;
  let dataCardInfor: any = null;
  let cardInfor = {};
  let lyrics = "";
  onValue(ref(dbFirebase, '/songs/' + id), (item) => {
    dataCardInfor = item.val();
    onValue(ref(dbFirebase, '/singers/' + dataCardInfor.singerId[0]), (itemSinger) => {
      const dataSinger = itemSinger.val();
      console.log(dataSinger);
      dataCardInfor["singer"] = dataSinger.title;
    })
    cardInfor = {
      img: dataCardInfor.image,
      title: dataCardInfor.title,
      content: dataCardInfor.singer
    }
    lyrics = dataCardInfor.lyric;
  })
  // End Card Information

  // Same category songs
  const dataSection3: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (data.categoryId === dataCardInfor.categoryId && key != id) {
        onValue(ref(dbFirebase, 'singers/' + data.singerId[0]), (itemSinger) => {
          const dataSinger = itemSinger.val();
          console.log(dataSinger);
          dataSection3.push({
            id: key,
            img: data.image,
            title: data.title,
            singer: dataSinger.title,
            listener: data.listen,
            time: data.time,
            link: key,
          })
        })
      }
    })
  });
  // End Same category songs

  return (
    <>
      {/* Section1 */}
      <CardInfor
        item={cardInfor}
      />
      {/* Section2 */}
      <Title
        title="Lời Bài Hát"
      />
      <div className="bg-[#212121] rounded-[15px] p-[20px] mb-[15px] text-white text-[14px] font-[500] whitespace-pre-line">
        {lyrics}
      </div>
      {/* Section3 */}
      <Title
        title="Bài Hát Cùng Danh Mục"
      />
      <div>
        {dataSection3.map((item, index) => (
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
