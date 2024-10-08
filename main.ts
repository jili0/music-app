//Musikdaten als Array hinzufügen
//dt



interface Song {
    number: number;
    title: string;
    artist: string;
    length: string;
}

const playlist : Song[] = [
    {number: 1, title: "Home", artist: "Jordan Schor & Harley Bird", length: "3:36"},
    {number: 2, title: "Here I Am", artist: "One Point Zero", length: "3:05"},
    {number: 3, title: "Crazy", artist: "BEAUZ & JVNA", length: "3:08"},
    {number: 4, title: "Want Me", artist: "Jimmy Hardwind & Mike Archangelo", length: "3:48"},
    {number: 5, title: "Sun Goes Down", artist: "Jim Yosef & ROY KNOX", length: "2:48"},
    {number: 6, title: "Vision", artist: "Lost Sky", length: "3:54"}
    
]

//Playlist erstellen
function makePlaylist (playlist: Song[]): void {
    const playlistElement = document.getElementById("playlist");

    if(playlistElement){
        
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
    })


//jl: toggle searchbar
const showSearchbar = () => {
  if (searchbar) searchbar.style.animationName === "hideSearchbar" ? searchbar.style.animationName = "showSearchbar" : searchbar.style.animationName = "hideSearchbar" ;

}
const searchBtn = document.getElementById("searchBtn")
const searchbar = document.getElementById("searchbar")
searchBtn?.addEventListener("click", showSearchbar)

//Menübtn ag

const menuBtn = document.getElementById("menu-btn")
const container = document.getElementById("container")

menuBtn?.addEventListener("click", () =>{
    container?.classList.toggle("active");
});


// jl: button functions
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

const playPreviousSong = () => {
    console.log("prev")
}

const playNextSong = () => {
    console.log("next")
}

const playSong = () => {
    console.log("play")
}

playBtn?.addEventListener("click", playSong)
prevBtn?.addEventListener("click", playPreviousSong)
nextBtn?.addEventListener("click", playNextSong)