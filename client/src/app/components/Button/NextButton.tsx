import { playSong } from "@/helper/playSong";
import { MdSkipNext } from "react-icons/md";

export const NextButton = () => {
    const handleNext = () => {
        const currentSongIndex = JSON.parse(localStorage.getItem("currentSongIndex"));
        const currentPlaylist = JSON.parse(localStorage.getItem("currentPlaylist"));
        
        const nextSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
        localStorage.setItem("currentSong", JSON.stringify(currentPlaylist[nextSongIndex]));
        localStorage.setItem("currentSongIndex", JSON.stringify(nextSongIndex));
        playSong(currentPlaylist[nextSongIndex]);
    }

    return (
        <>
            <button
                onClick={handleNext}
                className="next-button"
            >
                <MdSkipNext />
            </button>
        </>
    );
}