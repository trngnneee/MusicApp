import { Metadata } from "next";
import { Title } from "./components/Title/Title";
import { CardItem } from "./components/CardItem/CardItem";
import { SongItem } from "./components/SongItem/SongItem";
import { dbFirebase } from "./FirebaseConfig";
import { onValue, ref } from "firebase/database";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nghe nhạc trực tuyến",
};

export default function Home() {
  // Data section 1 
  const dataSection1: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (dataSection1.length < 3) {
        onValue(ref(dbFirebase, 'singers/' + data.singerId[0]), (itemSinger) => {
          const dataSinger = itemSinger.val();
          dataSection1.push({
            id: key,
            img: data.image,
            title: data.title,
            singer: dataSinger.title,
            listener: data.listen,
            link: `/songs/${key}`,
            audio: data.audio,
            wishlist: data.wishlist
          })
        })
      }
    })
  });
  // End Data section 1

  // Data section 2
  const dataSection2: any[] = []
  const categoryRef = ref(dbFirebase, 'categories');
  onValue(categoryRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (dataSection2.length < 5) {
        dataSection2.push({
          id: key,
          img: data.image,
          title: data.title,
          content: data.description,
          link: `/category/${key}`
        })
      }
    })
  });
  // End Data section 2

  // Data section 3
  const dataSection3: any[] = []
  const singerRef = ref(dbFirebase, 'singers');
  onValue(singerRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (dataSection3.length < 5) {
        dataSection3.push({
          id: key,
          img: data.image,
          title: data.title,
          content: data.description,
          link: `/singers/${key}`
        })
      }
    })
  });
  // End Data section 3

  return (
    <>
      {/* Section1 */}
      <div>
        <div className="flex gap-[21px]">
          <div
            className="w-[534px] h-[361px] flex items-center gap-[34px] px-[30px] pt-[40px]"
            style={{ backgroundImage: "url('/background1.png')" }}
          >
            <div className="w-[50%]">
              <div className="font-[700] text-[32px] text-white mb-[6px]">Nhạc EDM</div>
              <div className="font-[400] text-[14px] text-white">Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ</div>
            </div>
            <div className="h-full w-[50%]">
              <img
                src="/human1.svg"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-white font-[700] text-[24px] mb-[20px]">Nghe nhiều</div>
            <div>
              {dataSection1.map((item, index) => (
                <div data-aos="fade-left" key={index}>
                  <SongItem
                    item={item}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Section2 */}
      <div className="mb-[30px]">
        <Title title="Danh Mục Nổi Bật" />
        <div className="grid grid-cols-5 gap-[20px]">
          {dataSection2.map((item, index) => (
            <div data-aos="fade-up" key={index}>
              <CardItem
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Section3 */}
      <div className="mb-[30px]">
        <Title title="Ca Sĩ Nổi Bật" />
        <div className="grid grid-cols-5 gap-[20px]">
          {dataSection3.map((item, index) => (
            <div data-aos="fade-up" key={index}>
              <CardItem
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
