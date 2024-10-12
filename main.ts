//GLOBAL VARIABLES
interface Song {
  number: number;
  title: string;
  artist: string;
  length: string;
}

let playlist: Song[];
let localStoragePlaylist: string | Array<object | null>;
let playlistCurrentSong: HTMLParagraphElement | null;
let playlistCurrentSongLikeBtn: HTMLElement | null;
let isPlaying: boolean = false;
let isShuffling: boolean = false;
let isRepeating: boolean = false;

// body container
const container = document.getElementById("container") as HTMLElement;

// header btn and container
const menuBtn = document.getElementById("menu") as HTMLElement;
const searchbar = document.getElementById("searchbar") as HTMLInputElement;
const searchBtn = document.getElementById("search") as HTMLElement;
const filteredSongsContainer = document.getElementById(
  "filteredSongs"
) as HTMLElement;

// main - current song info
const coverImg = document.getElementById("coverImg") as HTMLImageElement;
const currentTitle = document.getElementById("currentTitle") as HTMLElement;
const currentArtist = document.getElementById("currentArtist") as HTMLElement;

// main - control btn 
const prevBtn = document.getElementById("prev") as HTMLElement;
const playBtn = document.getElementById("play") as HTMLElement;
const nextBtn = document.getElementById("next") as HTMLElement;

// main - audio player
const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
const progressBar = document.getElementById("progress-bar") as HTMLInputElement;
const currentTimeDisplay = document.getElementById(
  "currentTime"
) as HTMLElement;
const durationDisplay = document.getElementById("duration") as HTMLElement;

// container.active: playlist
const playlistElement = document.getElementById("playlist") as HTMLElement;

// footer btn
const likeBtn = document.getElementById("like") as HTMLElement;
const shuffleBtn = document.getElementById("shuffle") as HTMLElement;
const repeatOneBtn = document.getElementById("repeatOne") as HTMLElement;
const settingsBtn = document.getElementById("settings") as HTMLElement;

console.log(localStorage.getItem("data"))

// FUNCTIONS

const fetchData = async (): Promise<Song[]> => {
  try {
    const response = await fetch("./data/songs.json");
    const jsonData: Song[] = await response.json();
    localStorage.setItem("data", JSON.stringify(jsonData));
    return jsonData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const postData = async (): Promise<void> => {
  try {
    const data = JSON.stringify(localStorage.getItem("data"))
    const response = await fetch("./data/songs.json", {
      method: "POST",
      body: data
    })
    console.log(response)
  } catch (err) {
    console.log(err);
  }
};

// functions - for searchbar
const toggleSearchbar = () => {
  if (searchbar) {
    !searchbar.classList.contains("showSearchbar") &&
    !searchbar.classList.contains("hideSearchbar") 
    ? searchbar.classList.add("showSearchbar")
    : searchbar.classList.toggle("hideSearchbar")
  }
};

const searchSong = () => {
  resetFilteredSongsContainer();
  const searchStr = searchbar.value.toLowerCase();
  if (searchStr.length) {
    const filteredSongs = playlist.filter(
      (song) =>
        song.title.toLowerCase().includes(searchStr) ||
        song.artist.toLowerCase().includes(searchStr)
    );
    filteredSongsContainer &&
      filteredSongs.forEach(
        (song) =>
          (filteredSongsContainer.innerHTML += `<p class="filteredSong" id="filteredSong-${
            song.number
          }" onclick="togglePlay(${song.number - 1})">${song.title} by ${
            song.artist
          }</p>`)
      );
    if (filteredSongs.length) filteredSongsContainer.style.display = "block";
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && searchbar.value) {
    searchSong();
  } else if (e.key === "Enter" && !searchbar.value) {
    alert("Please enter title/ artist to search!");
  }
};

// functions - render/update Display
const renderPlaylist = async (): Promise<void> => {
  playlist = await fetchData();
  if (playlistElement) {
    const playlistHTML = playlist
      .map((song, index) => {
        return `
        <div class="playlistItem" data-audio="./music/music-${song.number}.mp3" data-title="${song.title}" data-artist="${song.artist}" onclick="togglePlay(${index})">
          <p class="number" id="playlistItem-${index}">${song.number}</p>
          <p class="title">${song.title}</p>
          <p class="artist">${song.artist}</p>
          <p class="length">${song.length}</p>
          <svg
          id="playlistItemLikeBtn-${index}"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          >
            <path
              d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
            />
          </svg>
        </div>
        `;
      })
      .join("");
    playlistElement.innerHTML = playlistHTML;
    currentTitle.textContent = playlist[0].title;
    currentArtist.textContent = playlist[0].artist;
    playlist.forEach((i, index) => updatePlaylistLikeBtn(index));
  }
};

const updatePlayBtnIcon = () => {
  isPlaying
    ? playBtn.classList.replace("fa-play", "fa-pause")
    : playBtn.classList.replace("fa-pause", "fa-play");
};

const updateCoverImg = (index: number) => {
  coverImg.src = `./images/music-${index + 1}.jpg`;
};

const updatePlaylistStatus = (index: number) => {
  playlistCurrentSong = document.getElementById(
    `playlistItem-${index}`
  ) as HTMLParagraphElement;

  if (
    audioPlayer.src.includes(`/music/music-${index + 1}.mp3`) &&
    !audioPlayer.paused
  ) {
    playlistCurrentSong!.innerHTML = "<i class='fa fa-pause'></i>";
  } else {
    playlistCurrentSong!.innerHTML = `${index + 1}`;
  }
};

const updatePlaylistLikeBtn = (index: number) => {
  playlistCurrentSongLikeBtn = document.getElementById(
    `playlistItemLikeBtn-${index}`
  ) as HTMLElement;
  localStoragePlaylist = JSON.parse(
    localStorage.getItem("data") as string
  ) as Array<object>;
  if (localStoragePlaylist && localStoragePlaylist[index].isFavorite) {
    playlistCurrentSongLikeBtn.style.color = "red";
  } else {
    playlistCurrentSongLikeBtn.style.color = "white";
  }
};

const resetFilteredSongsContainer = () => {
  filteredSongsContainer.innerHTML = "";
  filteredSongsContainer.style.display = "none";
};

const toggleFavorite = () => {
  localStoragePlaylist = JSON.parse(localStorage.getItem("data") as string);
  let index;
  if (!audioPlayer.src) {
    index = 0;
  } else {
    index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 1;
  }
  if (localStoragePlaylist[index].isFavorite === false) {
    localStoragePlaylist[index].isFavorite = true;
  } else {
    localStoragePlaylist[index].isFavorite = false;
  }
  localStorage.setItem("data", JSON.stringify(localStoragePlaylist));
  playlist.forEach((i, index) => updatePlaylistLikeBtn(index));
  updateLikeBtn();
};

// functions - play/shuffle
const togglePlay = (index: number) => {
  playBtn.innerHTML = `<path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;

  searchbar.value = "";
  if (searchbar?.classList.contains("showSearchbar")) toggleSearchbar();
  const prevSrc = audioPlayer.src;
  const { number, title, artist } = playlist[index];
  audioPlayer.src = `./music/music-${number}.mp3`;
  if (isPlaying && prevSrc === audioPlayer.src) {
    audioPlayer.pause();
    isPlaying = false;
    updatePlaylistStatus(index);
      playBtn.innerHTML = `<path
            id="playBtnPath"
            d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"
          />`
  } else {
    audioPlayer.play().catch((err) => {
      console.error("Fehler beim Abspielen der Musik:", err);
    });
    isPlaying = true;
    updatePlaylistStatus(index);
    playBtn.innerHTML = `<path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;
  }
  currentTitle.textContent = title;
  currentArtist.textContent = artist;
  updatePlayBtnIcon();
  updateCoverImg(index);
  playlist.forEach((song, index) => updatePlaylistLikeBtn(index));
  updateLikeBtn();
  console.log(localStoragePlaylist);
};

const playPreviousSong = async () => {
  audioPlayer.pause();
  isPlaying = false;
  playlist = await fetchData();
  let index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 2;
  index < 0 ? (index += playlist.length) : null;
  togglePlay(index);
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

const shuffle = async (e: MouseEvent) => {
  if (!isShuffling) {
    (e.target as HTMLElement).style.color = "slateblue";
    const randomIndex = Math.floor(Math.random() * playlist.length);
    audioPlayer.src = `./music/music-${randomIndex + 1}.mp3`;
    audioPlayer.play();
    audioPlayer.autoplay = true;
    isPlaying = true;
    isShuffling = true;
    updatePlayBtnIcon();
    currentTitle.textContent = playlist[randomIndex].title;
    currentArtist.textContent = playlist[randomIndex].artist;
  } else {
    (e.target as HTMLElement).style.color = "white";
    audioPlayer.pause();
    audioPlayer.autoplay = false;
    isPlaying = false;
    isShuffling = false;
    updatePlayBtnIcon();
  }
};

const toggleRepeat = () => {
  if (!isRepeating) {
    audioPlayer.loop = true;
    repeatOneBtn.style.color = "slateblue";
  } else {
    audioPlayer.loop = false;
    repeatOneBtn.style.color = "white";
  }
  isRepeating = !isRepeating;
};

// functions - others
const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const setCurrentTime = () => {
  const newTime = (parseFloat(progressBar.value) / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
};

const updateTime = () => {
  if (!isNaN(audioPlayer.duration) && !isNaN(audioPlayer.currentTime)) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress.toFixed(1).toString();
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
  }
};

const updateLikeBtn = () => {
  let currentSongIndex =
    Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 1;
  console.log("update footer like", currentSongIndex);
  localStoragePlaylist = JSON.parse(
    localStorage.getItem("data") as string
  ) as Array<object>;
  if (
    localStoragePlaylist &&
    localStoragePlaylist[currentSongIndex].isFavorite
  ) {
    likeBtn.style.color = "red";
  } else {
    likeBtn.style.color = "white";
  }
};

const handleMenuBtnKlick = () => {
  container?.classList.toggle("active");
  updateLikeBtn();
};

// call the funktions
document.addEventListener("DOMContentLoaded", () => renderPlaylist());
document.addEventListener("click", resetFilteredSongsContainer);
menuBtn?.addEventListener("click", handleMenuBtnKlick);
searchBtn?.addEventListener("click", toggleSearchbar);
searchbar?.addEventListener("input", searchSong);
searchbar?.addEventListener("focus", resetFilteredSongsContainer);
playBtn?.addEventListener("click", play);
prevBtn?.addEventListener("click", playPreviousSong);
nextBtn?.addEventListener("click", playNextSong);
shuffleBtn?.addEventListener("click", shuffle);
repeatOneBtn.addEventListener("click", toggleRepeat);
audioPlayer?.addEventListener("timeupdate", updateTime);
progressBar?.addEventListener("input", setCurrentTime);
likeBtn?.addEventListener("click", toggleFavorite);
