import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { MdSkipNext } from "react-icons/md";
import Swal from "sweetalert2";

export const NextButton = () => {
    const getSongData = async (id) => {
        let ans: { id: string; img: string; title: string; singer: string; audio: string } = { id: '', img: '', title: '', singer: '', audio: '' };
        const songRef = ref(dbFirebase, 'songs');
        const snapshot = await get(songRef);
        const data = snapshot.val();

        const singerArray = [];
        for (const singer of data[id].singerId) {
            const singerRef = ref(dbFirebase, `singers/${singer}`);
            const snapshot = await get(singerRef);
            const dataSinger = snapshot.val();
            singerArray.push(dataSinger.title);
        }
        const singerList = singerArray.join(", ");
        ans = {
            id: id,
            img: data[id].image,
            title: data[id].title,
            singer: singerList,
            audio: data[id].audio,
        }
        return ans;
    }

    const handlePlay = async (id) => {
        const item = await getSongData(id);
        const audio = item.audio;
        // Play Music
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const elementPlayAudio: any = document.querySelector(".play-audio");
        // Add an ID
        elementPlayAudio.setAttribute("id", item.id);
        // End Add an ID
        const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
        const elementSource = elementAudio?.querySelector("source");
        if (elementSource) {
            elementSource.src = audio;
        }
        if (elementAudio) {
            elementAudio.load();
            elementAudio.play();
        }
        // End Play Music

        // Display Play Button
        elementPlayAudio.classList.remove("hidden")
        // End Display Play Button

        // Display image, title, singer
        const elementImage = elementPlayAudio.querySelector(".inner-image");
        elementImage.src = item.img;

        const elementTitle = elementPlayAudio.querySelector(".inner-title");
        elementTitle.innerHTML = item.title;

        const elementSinger = elementPlayAudio.querySelector(".inner-singer");
        elementSinger.innerHTML = item.singer;
        // End Display image, title, singer

        // Display Pause 
        const elementPauseButton = elementPlayAudio.querySelector(".inner-button-play");
        elementPauseButton.classList.add("play");
        // End Display Pause

        // Get total time of song
        const elementTotalTime = elementPlayAudio.querySelector(".inner-time .inner-time-total");
        const elementCurrentTime = elementPlayAudio.querySelector(".inner-time .inner-time-current");
        elementAudio.onloadedmetadata = () => {
            const totalTime = elementAudio.duration;
            elementTotalTime.max = totalTime;

            // Get current time of song
            elementAudio.ontimeupdate = () => {
                const currentTime = elementAudio.currentTime;
                const percent = currentTime * 100 / totalTime;
                elementCurrentTime.style.width = `${percent}%`;
                elementTotalTime.value = currentTime;
            }
            // End Get current time of song
        }
        // End Get total time of song
    }

    const handleNext = async () => {
        const userId = authFireBase?.currentUser?.uid;
        if (userId) {
            const playListRef = ref(dbFirebase, `users/${userId}/playlist`);
            const snapshot = await get(playListRef);
            const data = snapshot.val();

            const elementPlayAudio: any = document.querySelector(".play-audio");
            const currentSongId = elementPlayAudio.getAttribute("id");

            const currentIndex = data.indexOf(currentSongId);
            const nextIndex = (currentIndex + 1) % data.length;
            const nextSongId = data[nextIndex];

            handlePlay(nextSongId);
        }
        else {
            Swal.fire({
                title: "Vui Lòng Đăng Nhập",
                icon: "error",
                showConfirmButton: true
            });
        }
    }

    return (
        <>
            <button
                onClick={handleNext}
            >
                <MdSkipNext />
            </button>
        </>
    );
}