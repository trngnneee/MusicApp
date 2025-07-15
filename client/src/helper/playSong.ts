export const playSong = (item: any) => {
  const elementPlayAudio: any = document.querySelector(".play-audio");
  const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
  const elementSource = elementAudio?.querySelector("source");
  const elementTotalTime = elementPlayAudio.querySelector(".inner-time .inner-time-total");
  const elementCurrentTime = elementPlayAudio.querySelector(".inner-time .inner-time-current");

  if (elementSource) {
    elementSource.src = item.audio;
  }
  if (elementAudio) {
    elementAudio.load();
    elementAudio.play();
  }

  elementPlayAudio.classList.remove("hidden")

  const elementImage = elementPlayAudio.querySelector(".inner-image");
  elementImage.src = item.avatar;

  const elementTitle = elementPlayAudio.querySelector(".inner-title");
  elementTitle.innerHTML = item.name;

  const elementSinger = elementPlayAudio.querySelector(".inner-singer");
  let singerTitle = "";
  item.singer.map((singer, index) => {
    singerTitle += singer.name;
    if (index != item.singer.length - 1) singerTitle += ", ";
  })
  elementSinger.innerHTML = singerTitle;

  const elementPauseButton = elementPlayAudio.querySelector(".inner-button-play");
  elementPauseButton.classList.add("play");

  elementAudio.onloadedmetadata = () => {
    const totalTime = elementAudio.duration;
    elementTotalTime.max = totalTime;

    elementAudio.ontimeupdate = () => {
      const currentTime = elementAudio.currentTime;
      const percent = currentTime * 100 / totalTime;
      elementCurrentTime.style.width = `${percent}%`;
      elementTotalTime.value = currentTime;
    };
  };

  elementAudio.onended = () => {
    const loopButton = document.querySelector(".loop-button");
    if (loopButton.getAttribute("data-loop-active") == "true") {
      elementAudio.load();
      elementAudio.play();
    }
    else {
      const nextButton = document.querySelector(".next-button");
      (nextButton as HTMLElement).click();
    }
  };
}