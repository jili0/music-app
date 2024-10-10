//Globale Variablen

let playlist: Song[];
let isPlaying: boolean = false;
let isShuffling: boolean = false;
let isRepeat: boolean = false;

interface Song {
  number: number;
  title: string;
  artist: string;
  length: string;
}

const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
const playlistElement = document.getElementById("playlist") as HTMLElement;
const songTitleElement = document.getElementById("infoTitle") as HTMLElement;
const songArtistElement = document.getElementById("infoArtist") as HTMLElement;
const menuBtn = document.getElementById("menuBtn") as HTMLElement;
const container = document.getElementById("container") as HTMLElement;
const searchBtn = document.getElementById("searchBtn") as HTMLElement;
const searchbar = document.getElementById("searchbar") as HTMLInputElement;
const prevBtn = document.getElementById("prev") as HTMLElement;
const playBtn = document.getElementById("play") as HTMLElement;
const nextBtn = document.getElementById("next") as HTMLElement;
const progressBar = document.getElementById("progress-bar") as HTMLInputElement;
const currentTimeDisplay = document.getElementById(
  "currentTime"
) as HTMLElement;
const durationDisplay = document.getElementById("duration") as HTMLElement;
const shuffleBtn = document.getElementById("shuffle") as HTMLElement;
const repeatBtn = document.getElementById("repeat") as HTMLElement;
const filteredSongsContainer = document.getElementById(
  "filteredSongs"
) as HTMLElement;
const albumImg = document.getElementById("coverImg") as HTMLImageElement;
let playlistCurrentItem: HTMLParagraphElement | null;

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
        <div class="playlistItem" data-audio="./music/music-${song.number}.mp3" data-title="${song.title}" data-artist="${song.artist}" onclick="togglePlay(${index})">
          <p class="number" id="playlistItem-${index}">${song.number}</p>
          <p class="title">${song.title}</p>
          <p class="artist">${song.artist}</p>
          <p class="length">${song.length}</p>
          <i class="fas fa-heart"></i>
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

const updateAlbumImg = (index: number) => {
  albumImg.src = `./images/music-${index + 1}.jpg`;
};

const updatePlaylistStatus = (index: number) => {
  playlistCurrentItem = document.getElementById(
    `playlistItem-${index}`
  ) as HTMLParagraphElement;
  if (
    audioPlayer.src.includes(`/music/music-${index + 1}.mp3`) &&
    !audioPlayer.paused
  ) {
    playlistCurrentItem!.innerHTML = "<i class='fa fa-pause'></i>";
  } else {
    console.log("else")
    playlistCurrentItem!.innerHTML =`${index + 1}`
  }
};

const togglePlay = (index: number) => {
  searchbar.value = "";
  if (searchbar?.classList.contains("showSearchbar")) toggleSearchbar();
  const prevSrc = audioPlayer.src;
  const { number, title, artist } = playlist[index];
  audioPlayer.src = `./music/music-${number}.mp3`;
  if (isPlaying && prevSrc === audioPlayer.src) {
    audioPlayer.pause();
    isPlaying = false;
    updatePlaylistStatus(index);
  } else {
    audioPlayer.play().catch((err) => {
      console.error("Fehler beim Abspielen der Musik:", err);
    });
    isPlaying = true;
    updatePlaylistStatus(index);
  }
  songTitleElement.textContent = title;
  songArtistElement.textContent = artist;
  updatePlayBtnIcon();
  updateAlbumImg(index);
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

const resetFilteredSongsContainer = () => {
  filteredSongsContainer.innerHTML = "";
  filteredSongsContainer.style.display = "none";
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

// Favourits fa-heart
const toggleFavorite = (event: Event) => {
  const heartIcon = event.target as HTMLElement;
  
  if (heartIcon.classList.contains("favorite")) {
    heartIcon.classList.remove("favorite");
    heartIcon.style.color = "white"; 
  } else {
    heartIcon.classList.add("favorite");
    heartIcon.style.color = "rgb(80, 71, 143)"; 
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const heartIcons = document.querySelectorAll(".fa-heart");

  heartIcons.forEach((heartIcon) => {
    heartIcon.addEventListener("click", toggleFavorite);
  });
});
// end favourits
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
    songTitleElement.textContent = playlist[randomIndex].title;
    songArtistElement.textContent = playlist[randomIndex].artist;
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
  if(!isRepeat) {
    audioPlayer.loop = true;
    repeatBtn.style.color = "slateblue";
  }else {
    audioPlayer.loop = false;
    repeatBtn.style.color = "white";
}
isRepeat = !isRepeat;
};

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

// call the funktions
document.addEventListener("DOMContentLoaded", () => renderPlaylist());
document.addEventListener("click", resetFilteredSongsContainer);
menuBtn?.addEventListener("click", () => container?.classList.toggle("active"));
searchBtn?.addEventListener("click", toggleSearchbar);
searchbar?.addEventListener("input", searchSong);
searchbar?.addEventListener("focus", resetFilteredSongsContainer);
playBtn?.addEventListener("click", play);
prevBtn?.addEventListener("click", playPreviousSong);
nextBtn?.addEventListener("click", playNextSong);
shuffleBtn?.addEventListener("click", shuffle);
repeatBtn.addEventListener("click", toggleRepeat);
audioPlayer?.addEventListener("timeupdate", updateTime);
progressBar?.addEventListener("input", setCurrentTime);
