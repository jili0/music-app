"use strict";
//Musikdaten als Array hinzufügen und Audio-Player
//dt
// import from "./data/songs.json" assert{type: "json" } as data;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('./data/songs.json');
            const jsonData = yield response.json();
            return jsonData;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    });
}
//Playlist erstellen
function makePlaylist() {
    return __awaiter(this, void 0, void 0, function* () {
        const playlist = yield fetchData();
        const playlistElement = document.getElementById("playlist");
        if (playlistElement) {
            const playlistHTML = playlist
                .map((song) => {
                return `
        <div class="song">
          <div class="no"><h6>${song.number}</h6></div>
          <div class="title"><h6>${song.title}</h6></div>
          <div class="artist"><h6>${song.artist}</h6></div>
          <div class="length"><h6>${song.length}</h6></div>
          <div><i class="fas fa-heart"></i></div>
        </div>
        `;
            })
                .join("");
            playlistElement.innerHTML = playlistHTML;
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    makePlaylist();
});
const audioPlayer = document.getElementById("audio-player");
//dt: Song abspielen
function playSong(audioFile, title, artist) {
    audioPlayer.src = audioFile;
    audioPlayer.play();
}
//jl: toggle searchbar
const toggleSearchbar = () => {
    if (!(searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.contains("showSearchbar")) && !(searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.contains("hideSearchbar"))) {
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.add("showSearchbar");
    }
    else {
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.toggle("showSearchbar");
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.classList.toggle("hideSearchbar");
    }
};
const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", toggleSearchbar);
//Menübtn ag
const menuBtn = document.getElementById("menu-btn");
const container = document.getElementById("container");
menuBtn === null || menuBtn === void 0 ? void 0 : menuBtn.addEventListener("click", () => {
    container === null || container === void 0 ? void 0 : container.classList.toggle("active");
});
// jl: button functions
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const playPreviousSong = () => {
    console.log("prev");
};
const playNextSong = () => {
    console.log("next");
};
// const playSong = () => {
//     console.log("play")
// }
// playBtn?.addEventListener("click", playSong)
prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener("click", playPreviousSong);
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", playNextSong);
