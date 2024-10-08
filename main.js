"use strict";
//Musikdaten als Array hinzufügen und Audio-Player
//dt
const audioPlayer = document.getElementById("audio-player");
const playlist = [
    { number: 1, title: "Home", artist: "Jordan Schor & Harley Bird", length: "3:36", audioFile: "music/music-1.mp3" },
    { number: 2, title: "Here I Am", artist: "One Point Zero", length: "3:05", audioFile: "music/music-2.mp3" },
    { number: 3, title: "Crazy", artist: "BEAUZ & JVNA", length: "3:08", audioFile: "music/music-3.mp3" },
    { number: 4, title: "Want Me", artist: "Jimmy Hardwind & Mike Archangelo", length: "3:48", audioFile: "music/music-4.mp3" },
    { number: 5, title: "Sun Goes Down", artist: "Jim Yosef & ROY KNOX", length: "2:48", audioFile: "music/music-5.mp3" },
    { number: 6, title: "Vision", artist: "Lost Sky", length: "3:54", audioFile: "music/music-6.mp3" }
];
//Playlist erstellen
function makePlaylist(playlist) {
    const playlistElement = document.getElementById("playlist");
    if (playlistElement) {
        const playlistHTML = playlist.map((song) => {
            return `
        <div class="song">
          <div class="no"><h6>${song.number}</h6></div>
          <div class="title"><h6>${song.title}</h6></div>
          <div class="artist"><h6>${song.artist}</h6></div>
          <div class="length"><h6>${song.length}</h6></div>
          <div><i class="fas fa-heart"></i></div>
        </div>`;
        }).join("");
        playlistElement.innerHTML = playlistHTML;
    }
    document.addEventListener("DOMContentLoaded", () => {
        makePlaylist(playlist);
    });
}
//dt: Song abspielen
function playSong(audioFile, title, artist) {
    audioPlayer.src = audioFile;
    audioPlayer.play();
}
//jl: toggle searchbar
const showSearchbar = () => {
    if (searchbar)
        searchbar.style.animationName === "hideSearchbar" ? searchbar.style.animationName = "showSearchbar" : searchbar.style.animationName = "hideSearchbar";
};
const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", showSearchbar);
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
