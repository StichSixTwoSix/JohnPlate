const open = document.getElementById("open");
const close = document.getElementById("close");
const album = document.querySelector(".album");
const cover = document.querySelector(".cover");

open.addEventListener("click", function (e) {
  album.classList.add("album-open");
  cover.classList.add("cover-open");
});
close.addEventListener("click", function (e) {
  album.classList.remove("album-open");
  cover.classList.remove("cover-open");
});

// player

const trackCover = document.querySelector(".vinil");
const previousBtm = document.getElementById("previous");
const playBtm = document.getElementById("play");
const playpause = document.querySelector(".playpause");
const nextkBtm = document.getElementById("next");
// const audio = document.getElementById("audio");

let currentTrack = 0,
  audio = new Audio();

const songs = [
  {
    title: "Elysium",
    artist: "John Plate",
    time: "2.50",
    src: "Elysium.mp3",
  },
  {
    title: "No. 404",
    artist: "John Plate",
    time: "2.50",
    src: "404.mp3",
  },
  {
    title: "Performance",
    artist: "John Plate",
    time: "2.50",
    src: "Performance.mp3",
  },
  {
    title: "Territory",
    artist: "John Plate",
    time: "2.50",
    src: "Territory.mp3",
  },
  {
    title: "Steel Legend",
    artist: "John Plate",
    time: "2.50",
    src: "SteelLegend.mp3",
  },
];

const songList = document.getElementById("songList"),
  trackName = document.getElementById("trackName");

function init() {
  createPlaylist(songs);
  loadTrack(currentTrack);
}

init();

function createPlaylist(songs) {
  songList.innerHTML = "";

  songs.forEach((track, index) => {
    const { title, src, time } = track;
    const trackItem = document.createElement("div");
    trackItem.classList.add("track");
    trackItem.innerHTML = `
      <div class="number">${index + 1}.</div>
      <div class="name">${title}</div>
      <div class="time">${time}</div>
    `;
    songList.appendChild(trackItem);

    trackItem.addEventListener("click", (e) => {
      currentTrack = index;
      loadTrack(currentTrack);
      playSong();
    });

    const audioForTime = new Audio(`./media/${src}`);
    audioForTime.addEventListener("loadedmetadata", () => {
      const songDuration = audioForTime.duration;
      let trackDuration = fomatTime(songDuration);
      trackItem.querySelector(".time").innerHTML = trackDuration;
    });
  });
}

function fomatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

function loadTrack(num) {
  trackName.innerText = `${songs[currentTrack].title}`;
  audio.src = `./media/${songs[currentTrack].src}`;
}

function playSong() {
  playpause.src = `./img/pause.svg`;
  playBtm.classList.add("onplay");
  trackCover.classList.add("onstart");
  audio.play();
}
function pauseSong() {
  playpause.src = `./img/play.svg`;
  playBtm.classList.remove("onplay");
  trackCover.classList.remove("onstart");
  audio.pause();
}

playBtm.addEventListener("click", () => {
  const isPlaying = playBtm.classList.contains("onplay");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function nextTrack() {
  currentTrack++;
  if (currentTrack > songs.length - 1) {
    currentTrack = 0;
  }
  loadTrack(songs[currentTrack]);
  playSong();
}

nextkBtm.addEventListener("click", nextTrack);

function prevTrack() {
  currentTrack--;
  if (currentTrack < 0) {
    currentTrack = songs.length - 1;
  }
  loadTrack(songs[currentTrack]);
  playSong();
}

previousBtm.addEventListener("click", prevTrack);

audio.addEventListener("ended", nextTrack);
