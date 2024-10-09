"use strict";
// initialize
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let playlist;
const audioPlayer = document.getElementById("audio-player");
const playlistElement = document.getElementById("playlist");
const songTitleElement = document.getElementById("infoTitle");
const songArtistElement = document.getElementById("infoArtist");
const menuBtn = document.getElementById("menu-btn");
const container = document.getElementById("container");
const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
let isPlaying = false;
let isShuffling = false;
// functions
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("./data/songs.json");
        const jsonData = yield response.json();
        return jsonData;
    }
    catch (err) {
        console.log(err);
        return [];
    }
});
const renderPlaylist = () => __awaiter(void 0, void 0, void 0, function* () {
    playlist = yield fetchData();
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
});
const updatePlayBtnIcon = () => {
    isPlaying
        ? playBtn.classList.replace("fa-play", "fa-pause")
        : playBtn.classList.replace("fa-pause", "fa-play");
};
const togglePlay = (index) => {
    const { number, title, artist } = playlist[index];
    audioPlayer.src = `./music/music-${number}.mp3`;
    if (!isPlaying) {
        audioPlayer.play().catch((err) => {
            console.error("Fehler beim Abspielen der Musik:", err);
        });
        isPlaying = true;
    }
    else {
        audioPlayer.pause();
        isPlaying = false;
    }
    songTitleElement.textContent = title;
    songArtistElement.textContent = artist;
    updatePlayBtnIcon();
};
const toggleSearchbar = () => {
    if (!(searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.contains("showSearchbar")) &&
        !(searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.contains("hideSearchbar"))) {
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.add("showSearchbar");
    }
    else {
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.toggle("showSearchbar");
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.toggle("hideSearchbar");
    }
};
const playPreviousSong = () => __awaiter(void 0, void 0, void 0, function* () {
    audioPlayer.pause();
    isPlaying = false;
    playlist = yield fetchData();
    let index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 2;
    index < 0 ? (index += playlist.length) : null;
    togglePlay(index);
    console.log(isPlaying);
});
const playNextSong = () => __awaiter(void 0, void 0, void 0, function* () {
    audioPlayer.pause();
    isPlaying = false;
    playlist = yield fetchData();
    let index = Number(audioPlayer.src.split("").slice(-5, -4).join(""));
    index >= playlist.length ? (index -= playlist.length) : null;
    togglePlay(index);
});
const play = () => {
    if (!audioPlayer.src) {
        togglePlay(0);
    }
    else {
        let index = Number(audioPlayer.src.split("").slice(-5, -4).join("")) - 1;
        togglePlay(index);
    }
};
const shuffle = (e) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
        e.target.style.color = "white";
        audioPlayer.pause();
        audioPlayer.autoplay = false;
        isPlaying = false;
        isShuffling = false;
    }
});
// call the funktions
document.addEventListener("DOMContentLoaded", () => renderPlaylist());
menuBtn === null || menuBtn === void 0 ? void 0 : menuBtn.addEventListener("click", () => container === null || container === void 0 ? void 0 : container.classList.toggle("active"));
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", toggleSearchbar);
playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener("click", play);
prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener("click", playPreviousSong);
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", playNextSong);
shuffleBtn === null || shuffleBtn === void 0 ? void 0 : shuffleBtn.addEventListener("click", shuffle);
