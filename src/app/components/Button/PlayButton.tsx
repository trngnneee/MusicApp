"use client"

import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { get, ref, set } from "firebase/database";
import { FaPlay } from "react-icons/fa";
import Swal from "sweetalert2";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PlayButton = (props: any) => {
    const { item } = props;

    const handlePlay = () => {
        // Add to playlist
        const userId = authFireBase?.currentUser?.uid;
        if (userId && item.id) {
            const userRef = ref(dbFirebase, `/users/${userId}/playlist`);
            get(userRef).then(async (snapshot) => {
                const playlists = snapshot.val() || [];
                if (!playlists.includes(item.id)) {
                    playlists.push(item.id);
                    Swal.fire({
                        title: "Thêm vào danh sách phát!",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });
                    await set(userRef, playlists);
                }
            })
        }
        // End Add to playlist
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

    return (
        <>
            <button
                className="text-[10px] sm:text-[15px] p-[5px] md:p-[8px] text-white rounded-[50%] bg-[#00ADEF] hover:bg-[#277594] play-button"
                onClick={handlePlay}
            >
                <FaPlay />
            </button>
        </>
    );
}