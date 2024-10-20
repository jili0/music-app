"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// body container
const container = document.getElementById("container");
// header btn and container
const menuBtn = document.getElementById("menu");
const searchbar = document.getElementById("searchbar");
const searchBtn = document.getElementById("search");
const filteredSongsContainer = document.getElementById("filteredSongs");
// main - current song info
const coverImg = document.getElementById("coverImg");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
// main - control btn
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
// main - audio player
const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
// container.active: playlist
const playlistContainer = document.getElementById("playlist");
const playlistItemLikeBtns = document.getElementsByClassName(".playlistItemLikeBtn");
// footer btn
const likeBtn = document.getElementById("like");
const shuffleBtn = document.getElementById("shuffle");
const repeatOneBtn = document.getElementById("repeatOne");
const settingsBtn = document.getElementById("settings");
let playlist;
let localStoragePlaylist = JSON.parse(localStorage.getItem("data")) || [];
let playlistCurrentSong;
let playlistCurrentSongLikeBtn;
let isPlaying = false;
let isShuffling = false;
let isRepeating = false;
let currentSongIndex = Number(audioPlayer.src.split("").slice(-5, -4).join("")) || 0;
// FUNCTIONS
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("./data/songs.json");
        const jsonData = yield response.json();
        localStorage.setItem("data", JSON.stringify(jsonData));
        return jsonData;
    }
    catch (err) {
        console.log(err);
        return [];
    }
});
// const postData = async (): Promise<void> => {
//   try {
//     const data = JSON.stringify(localStorage.getItem("data"));
//     const response = await fetch("./data/songs.json", {
//       method: "POST",
//       body: data,
//     });
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// functions - for searchbar
const toggleSearchbar = () => {
    if (!searchbar.classList.contains("showSearchbar") &&
        !searchbar.classList.contains("hideSearchbar"))
        searchbar.classList.add("showSearchbar");
    else {
        searchbar.value = "";
        searchbar.classList.toggle("hideSearchbar");
    }
};
const searchSong = () => {
    resetFilteredSongsContainer();
    const searchStr = searchbar.value.toLowerCase();
    if (searchStr.length) {
        const filteredSongs = playlist.filter((song) => song.title.toLowerCase().includes(searchStr) ||
            song.artist.toLowerCase().includes(searchStr));
        filteredSongsContainer &&
            filteredSongs.forEach((song) => (filteredSongsContainer.innerHTML += `<p class="filteredSong" id="filteredSong-${song.number}" onclick="togglePlay(${song.number})">${song.title} by ${song.artist}</p>`));
        if (filteredSongs.length)
            filteredSongsContainer.style.display = "block";
    }
};
// functions - render/update Display
const renderPlaylist = () => __awaiter(void 0, void 0, void 0, function* () {
    playlist = yield fetchData();
    if (playlistContainer) {
        const playlistHTML = playlist
            .map((song) => {
            const src = `/music/music-${song.number}.mp3`;
            playlistContainer.innerHTML += `
        <div class="playlistItem" data-audio="./music/music-${song.number}.mp3" data-title="${song.title}" data-artist="${song.artist}" onclick="togglePlay(${song.number})">
          <p class="number" id="playlistItem-${song.number}">${currentSongIndex === song.number && !audioPlayer.paused
                ? "<i class='fa fa-pause'></i>"
                : song.number + 1}</p>
          <p class="title">${song.title}</p>
          <p class="artist">${song.artist}</p>
          <p class="length">${song.length}</p>
          <svg
          class="playlistItemLikeBtn"
          id="playlistItemLikeBtn-${song.number}"
          onclick="toggleFavorite(${song.number})"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          >
            <path
              fill=${song.isFavorite ? "red" : "white"}
              d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
            />
          </svg>
        </div>
        `;
        })
            .join("");
    }
});
const renderCurrentSongInfo = () => {
    // update album image
    coverImg.src = `./images/music-${currentSongIndex}.jpg`;
    // update song title & artist
    currentTitle.textContent = playlist[currentSongIndex].title;
    currentArtist.textContent = playlist[currentSongIndex].artist;
    // update play btn
    isPlaying
        ? (playBtn.innerHTML = `<path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`)
        : (playBtn.innerHTML = `<path
    id="playBtnPath"
    d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"
  />`);
    // update like btn
    localStoragePlaylist[currentSongIndex].isFavorite
        ? (likeBtn.style.fill = "red")
        : (likeBtn.style.fill = "white");
};
const toggleFavorite = () => {
    localStoragePlaylist[currentSongIndex].isFavorite =
        !localStoragePlaylist[currentSongIndex].isFavorite;
    localStorage.setItem("data", JSON.stringify(localStoragePlaylist));
    renderPlaylist();
    renderCurrentSongInfo();
};
const resetFilteredSongsContainer = () => {
    filteredSongsContainer.innerHTML = "";
    filteredSongsContainer.style.display = "none";
};
// functions - play/shuffle
const togglePlay = (index) => {
    playBtn.innerHTML = `<path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;
    setTimeout(() => searchbar.classList.contains("showSearchbar") && !searchbar.classList.contains("hideSearchbar") ? toggleSearchbar() : null, 1500);
    const prevSrc = audioPlayer.src;
    const { number, title, artist } = playlist[index];
    audioPlayer.src = `./music/music-${number}.mp3`;
    currentSongIndex =
        Number(audioPlayer.src.split("").slice(-5, -4).join("")) || 0;
    if (isPlaying && prevSrc === audioPlayer.src) {
        audioPlayer.pause();
        isPlaying = false;
        renderPlaylist();
        playBtn.innerHTML = `<path
            id="playBtnPath"
            d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"
          />`;
    }
    else {
        audioPlayer.play().catch((err) => {
            console.error("Fehler beim Abspielen der Musik:", err);
        });
        isPlaying = true;
        renderPlaylist();
        renderCurrentSongInfo();
    }
    renderPlaylist();
};
const playPreviousSong = () => __awaiter(void 0, void 0, void 0, function* () {
    audioPlayer.pause();
    isPlaying = false;
    let index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 1;
    index < 0 ? (index += playlist.length) : null;
    togglePlay(index);
});
const playNextSong = () => __awaiter(void 0, void 0, void 0, function* () {
    audioPlayer.pause();
    isPlaying = false;
    let index = currentSongIndex + 1;
    index >= playlist.length ? (index -= playlist.length) : null;
    togglePlay(index);
});
const play = () => {
    currentSongIndex = !audioPlayer.src
        ? 0
        : Number(audioPlayer.src.split("").slice(-5, -4).join(""));
    togglePlay(currentSongIndex);
};
const shuffle = (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isShuffling) {
        e.target.style.fill = "slateblue";
        const randomIndex = Math.floor(Math.random() * (playlist === null || playlist === void 0 ? void 0 : playlist.length));
        currentSongIndex = randomIndex;
        audioPlayer.src = `./music/music-${currentSongIndex}.mp3`;
        audioPlayer.play();
        audioPlayer.autoplay = true;
        isPlaying = true;
        isShuffling = true;
        // updatePlayBtnIcon();
        // currentTitle.textContent = playlist[randomIndex].title;
        // currentArtist.textContent = playlist[randomIndex].artist;
    }
    else {
        e.target.style.fill = "white";
        audioPlayer.pause();
        audioPlayer.autoplay = false;
        isPlaying = false;
        isShuffling = false;
        // updatePlayBtnIcon();
    }
});
const toggleRepeat = () => {
    if (!isRepeating) {
        audioPlayer.loop = true;
        repeatOneBtn.style.fill = "slateblue";
    }
    else {
        audioPlayer.loop = false;
        repeatOneBtn.style.fill = "white";
    }
    isRepeating = !isRepeating;
    audioPlayer.paused && play();
};
// functions - others
const formatTime = (timeInSeconds) => {
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
const handleMenuBtnKlick = () => {
    container === null || container === void 0 ? void 0 : container.classList.toggle("active");
    // updateLikeBtn();
};
const startMusicApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield renderPlaylist();
    renderCurrentSongInfo();
});
// call the funktions
document.addEventListener("DOMContentLoaded", startMusicApp);
document.addEventListener("click", resetFilteredSongsContainer);
menuBtn === null || menuBtn === void 0 ? void 0 : menuBtn.addEventListener("click", handleMenuBtnKlick);
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", toggleSearchbar);
searchbar === null || searchbar === void 0 ? void 0 : searchbar.addEventListener("input", searchSong);
searchbar === null || searchbar === void 0 ? void 0 : searchbar.addEventListener("focus", resetFilteredSongsContainer);
playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener("click", play);
prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener("click", playPreviousSong);
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", playNextSong);
audioPlayer === null || audioPlayer === void 0 ? void 0 : audioPlayer.addEventListener("timeupdate", updateTime);
progressBar === null || progressBar === void 0 ? void 0 : progressBar.addEventListener("input", setCurrentTime);
likeBtn === null || likeBtn === void 0 ? void 0 : likeBtn.addEventListener("click", toggleFavorite);
shuffleBtn === null || shuffleBtn === void 0 ? void 0 : shuffleBtn.addEventListener("click", shuffle);
repeatOneBtn.addEventListener("click", toggleRepeat);
