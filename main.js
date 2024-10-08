"use strict";
//Musikdaten als Array hinzufügen
//dt
const playlist = [
    { number: 1, title: "Home", artist: "Jordan Schor & Harley Bird", length: "3:36" },
    { number: 2, title: "Here I Am", artist: "One Point Zero", length: "3:05" },
    { number: 3, title: "Crazy", artist: "BEAUZ & JVNA", length: "3:08" },
    { number: 4, title: "Want Me", artist: "Jimmy Hardwind & Mike Archangelo", length: "3:48" },
    { number: 5, title: "Sun Goes Down", artist: "Jim Yosef & ROY KNOX", length: "2:48" },
    { number: 6, title: "Vision", artist: "Lost Sky", length: "3:54" }
];
//Playlist erstellen
function makePlaylist(playlist) {
    const playlistElement = document.getElementById("playlist");
    if (playlistElement) {
        const playlistHTML = playlist.map((song) => {
            return `<tr>
            <td><h6>${song.number}</h6></td>
            <td><h6>${song.title}</h6></td>
            <td><h6>${song.artist}</h6></td>
            <td><h6>${song.length}</h6></td>
            <td><i class="fas fa-heart"></i></td>
          </tr>`;
        }).join("");
        playlistElement.innerHTML = playlistHTML;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    makePlaylist(playlist);
});
//jl: toggle searchbar
const showSearchbar = () => {
    if (searchbar)
        searchbar.style.animationName === "hideSearchbar" ? searchbar.style.animationName = "showSearchbar" : searchbar.style.animationName = "hideSearchbar";
};
const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", showSearchbar);
//Menübtn ag
// const menuBtn = document.querySelector(".menu-btn")
//  container = document.querySelector(".container")
// menuBtn.addEventListener("click", () =>{
//     container.classList.toggle("active");
// });
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
const playSong = () => {
    console.log("play");
};
playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener("click", playSong);
prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener("click", playPreviousSong);
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", playNextSong);
