import { playSong } from "@/helper/playSong";
import { MdSkipNext } from "react-icons/md";

export const NextButton = () => {
    const handleNext = () => {
        const currentPlaylist = JSON.parse(localStorage.getItem("currentPlaylist"));

        const newPlaylist = currentPlaylist.slice(1);
        localStorage.setItem("currentPlaylist", JSON.stringify(newPlaylist));
        localStorage.setItem("currentSong", JSON.stringify(currentPlaylist[1]));
        localStorage.setItem("currentSongIndex", JSON.stringify(0));
        playSong(currentPlaylist[1]);
    }

    return (
        <>
            <button
                onClick={handleNext}
                className="next-button text-[25px]"
            >
                <MdSkipNext />
            </button>
        </>
    );
}