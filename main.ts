// initialize

interface Song {
  number: number;
  title: string;
  artist: string;
  length: string;
}
let playlist: Song[];
const audioPlayer = document.getElementById("audio-player") as HTMLAudioElement;
const playlistElement = document.getElementById("playlist") as HTMLElement;
const songTitleElement = document.getElementById("infoTitle") as HTMLElement;
const songArtistElement = document.getElementById("infoArtist") as HTMLElement;
const menuBtn = document.getElementById("menu-btn") as HTMLElement;
const container = document.getElementById("container") as HTMLElement;
const searchBtn = document.getElementById("searchBtn") as HTMLElement;
const searchbar = document.getElementById("searchbar") as HTMLElement;
const prevBtn = document.getElementById("prev") as HTMLElement;
const playBtn = document.getElementById("play") as HTMLElement;
const nextBtn = document.getElementById("next") as HTMLElement;
const shuffleBtn = document.getElementById("shuffle") as HTMLElement;
let isPlaying: boolean = false;
let isShuffling: boolean = false;

// functions

const fetchData = async (): Promise<Song[]> => {
  try {
    const response = await fetch("./data/songs.json");
    const jsonData: Song[] = await response.json();
    return jsonData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const renderPlaylist = async (): Promise<void> => {
  playlist = await fetchData();
  if (playlistElement) {
    const playlistHTML = playlist
      .map((song, index) => {
        return `
        <div class="song" data-audio="./music/music-${song.number}.mp3" data-title="${song.title}" data-artist="${song.artist}" onclick="togglePlay(${index})">
          <div class="number">${song.number}</div>
          <div class="title">${song.title}</div>
          <div class="artist">${song.artist}</div>
          <div class="length">${song.length}</div>
          <div><i class="fas fa-heart"></i></div>
        </div>
        `;
      })
      .join("");
    playlistElement.innerHTML = playlistHTML;
    songTitleElement.textContent = playlist[0].title;
    songArtistElement.textContent = playlist[0].artist;
  }
};

const updatePlayBtnIcon = () => {
  isPlaying
    ? playBtn.classList.replace("fa-play", "fa-pause")
    : playBtn.classList.replace("fa-pause", "fa-play");
};

const togglePlay = (index: number) => {
  const { number, title, artist } = playlist[index];
  audioPlayer.src = `./music/music-${number}.mp3`;
  if (!isPlaying) {
    audioPlayer.play().catch((err) => {
      console.error("Fehler beim Abspielen der Musik:", err);
    });
    isPlaying = true;
  } else {
    audioPlayer.pause();
    isPlaying = false;
  }
  songTitleElement.textContent = title;
  songArtistElement.textContent = artist;
  updatePlayBtnIcon();
};

const toggleSearchbar = () => {
  if (
    !searchbar?.classList.contains("showSearchbar") &&
    !searchbar?.classList.contains("hideSearchbar")
  ) {
    searchbar?.classList.add("showSearchbar");
  } else {
    searchbar?.classList.toggle("showSearchbar");
    searchbar?.classList.toggle("hideSearchbar");
  }
};

const playPreviousSong = async () => {
  audioPlayer.pause();
  isPlaying = false;
  playlist = await fetchData();
  let index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 2;
  index < 0 ? (index += playlist.length) : null;
  togglePlay(index);
  console.log(isPlaying);
};

const playNextSong = async () => {
  audioPlayer.pause();
  isPlaying = false;
  playlist = await fetchData();
  let index = Number(audioPlayer.src.split("").slice(-5, -4).join(""));
  index >= playlist.length ? (index -= playlist.length) : null;
  togglePlay(index);
};

const play = () => {
  if (!audioPlayer.src) {
    togglePlay(0);
  } else {
    let index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 1;
    togglePlay(index);
  }
};

const shuffle = async (e) => {
  if (!isShuffling) {
    e.target.style.color = "slateblue";
    const randomIndex = Math.floor(Math.random() * playlist.length);
    audioPlayer.src = `./music/music-${randomIndex + 1}.mp3`;
    audioPlayer.play();
    audioPlayer.autoplay = true;
    isPlaying = true;
    isShuffling = true;
    updatePlayBtnIcon();
    songTitleElement.textContent = playlist[randomIndex].title;
    songArtistElement.textContent = playlist[randomIndex].artist;
  } else {
    e.target.style.color = "white";
    audioPlayer.pause();
    audioPlayer.autoplay = false;
    isPlaying = false;
    isShuffling = false;
    updatePlayBtnIcon();
  }
};

// call the funktions
document.addEventListener("DOMContentLoaded", () => renderPlaylist());
menuBtn?.addEventListener("click", () => container?.classList.toggle("active"));
searchBtn?.addEventListener("click", toggleSearchbar);
playBtn?.addEventListener("click", play);
prevBtn?.addEventListener("click", playPreviousSong);
nextBtn?.addEventListener("click", playNextSong);
shuffleBtn?.addEventListener("click", shuffle);
