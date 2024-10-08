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
let currentSongIndex = 0;
let songs = [];
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
//dt: Playlist erstellen
function makePlaylist() {
    return __awaiter(this, void 0, void 0, function* () {
        const playlist = yield fetchData();
        songs = playlist;
        const playlistElement = document.getElementById("playlist");
        if (playlistElement) {
            const playlistHTML = playlist
                .map((song, index) => {
                return `
        <div class="song" onclick="playSong(${index})">
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
//dt: Song abspielen
function playSong(index) {
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    if (audioPlayer && song && audioSource) {
        audioSource.src = song.audioFile;
        audioPlayer.load();
        audioPlayer.play().catch(err => {
            console.error('Fehler beim Abspielen der Musik:', err);
        });
    }
    else {
        console.error('Audio player element not found.');
    }
    // Aktualisieren der Song-Infos
    const songTitleElement = document.querySelector('.info h2');
    const songArtistElement = document.querySelector('.info h3');
    if (songTitleElement) {
        songTitleElement.textContent = song.title;
    }
    if (songArtistElement) {
        songArtistElement.textContent = song.artist;
    }
}
// Play/Pause-Funktion für das Play-Icon
const playPauseBtn = document.getElementById("playpause");
const audioPlayer = document.getElementById("audio-player");
const togglePlayPause = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.classList.replace("fa-play", "fa-pause"); // Icon zu Pause ändern
    }
    else {
        audioPlayer.pause();
        playPauseBtn.classList.replace("fa-pause", "fa-play"); // Icon zu Play ändern
    }
};
// Event Listener für das Play-Icon
playPauseBtn.addEventListener("click", togglePlayPause);
// dt: previous Song
const playPreviousSong = () => {
    if (currentSongIndex > 0) {
        currentSongIndex--; // Zum vorherigen Song wechseln
        playSong(currentSongIndex);
    }
};
//dt: next song
const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++; // Zum nächsten Song wechseln
        playSong(currentSongIndex);
    }
};
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
prevBtn.addEventListener("click", playPreviousSong);
nextBtn.addEventListener("click", playNextSong);
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
