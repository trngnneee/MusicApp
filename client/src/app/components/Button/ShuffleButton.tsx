import { useState } from "react";
import { TbArrowsShuffle } from "react-icons/tb";

export const ShuffleButton = () => {
  const [active, setActive] = useState(false);
  const [oldSongList, setOldSongList] = useState([]);

  const hanldeShuffle = () => {
    if (!active)
    {
      const playlistJSON = localStorage.getItem("currentPlaylist");
      const playlist = JSON.parse(playlistJSON);
      setOldSongList(playlist);
      const currentSongJSON = localStorage.getItem("currentSong");
      const currentSong = JSON.parse(currentSongJSON);
  
      const currentSongIndex = playlist.findIndex(song => song.id === currentSong.id);
      if (currentSongIndex === -1) return;
  
      const currentSongItem = playlist[currentSongIndex];
      const remainingSongs = playlist.filter(song => song.id !== currentSong.id);
  
      for (let i = remainingSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingSongs[i], remainingSongs[j]] = [remainingSongs[j], remainingSongs[i]];
      }
  
      const shuffledPlaylist = [currentSongItem, ...remainingSongs];
      localStorage.setItem("currentPlaylist", JSON.stringify(shuffledPlaylist));
    }
    else
    {
      const currentSong = JSON.parse(localStorage.getItem("currentSong"));
      const playlist = oldSongList;
      const itemIndex = playlist.findIndex(song => song.id == currentSong.id);
      const newPlaylist = playlist.slice(itemIndex);
      localStorage.setItem("currentPlaylist", JSON.stringify(newPlaylist));
    }
    setActive(!active);
  }

  return (
    <>
      <button onClick={hanldeShuffle} className={`text-[20px] ${active ? "text-[#00ADEF]" : "text-white"}`}>
        <TbArrowsShuffle />
      </button>
    </>
  );
}