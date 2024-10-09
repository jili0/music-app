//Musikdaten als Array hinzufügen und Audio-Player
//dt
// import from "./data/songs.json" assert{type: "json" } as data;

interface Song {
  number: number;
  title: string;
  artist: string;
  length: string;
  audioFile: string;
}

async function fetchData():Promise<Song[]> {
  try {
    const response = await fetch('./data/songs.json');
    const jsonData:Song[] = await response.json();
    return jsonData;
  } catch (err) {
    console.log(err)
    return []
  }
}

//Playlist erstellen
async function makePlaylist(): Promise<void> {
  const playlist = await fetchData()
  const playlistElement = document.getElementById("playlist") as HTMLElement;

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
}

document.addEventListener("DOMContentLoaded", () => {
  makePlaylist();
});

const audioPlayer = document.getElementById("audio-player") as HTMLAudioElement;
//dt: Song abspielen
function playSong (audioFile: string, title: string, artist: string) {
    audioPlayer.src = audioFile;
    audioPlayer.play();
}


//jl: toggle searchbar
const toggleSearchbar = () => {
  if (!searchbar?.classList.contains("showSearchbar") && !searchbar?.classList.contains("hideSearchbar") ) {
    searchbar?.classList.add("showSearchbar") 
  } else {
    searchbar?.classList.toggle("showSearchbar") 
    searchbar?.classList.toggle("hideSearchbar") 
  }
};

const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");
searchBtn?.addEventListener("click", toggleSearchbar);

//Menübtn ag

const menuBtn = document.getElementById("menu-btn");
const container = document.getElementById("container");

menuBtn?.addEventListener("click", () => {
  container?.classList.toggle("active");
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
prevBtn?.addEventListener("click", playPreviousSong)
nextBtn?.addEventListener("click", playNextSong)

//Ag playlist

let playing = false,
currentSong = 0,
repeat = false,
favourits = [],
audio = new Audio();


const songs = [
    {
        title:"Home",
        artist:"artist song 1",
        img_src: "1.jpg",
        src: "1.mp3",
    },
    {
        title:"Here I Am",
        artist:"artist song 2",
        img_src: "2.jpg",
        src: "2.mp3",
    },
    {
        title:"Crazy",
        artist:"artist song 3",
        img_src: "3.jpg",
        src: "3.mp3",
    },
    {
        title:"Want Me",
        artist:"artist song 4",
        img_src: "4.jpg",
        src: "4.mp3",
    },
    {
        title:"Sun Goes Down",
        artist:"artist song 5",
        img_src: "5.jpg",
        src: "5.mp3",
    },
    {
        title:"Vision",
        artist:"artist song 6",
        img_src: "6.jpg",
        src: "6.mp3",
    },
]

function init() {
    updatePlaylist(songs);
}
const playlistContainer = document.querySelector("#playlist");

function updatePlaylist(songs){
    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {
        const tr = document.createElement("tr");
    tr.classList.add("song");
    tr.innerHTML = `<div class="no">
              <h6>1</h6>
            </div>
            <div class="title">
              <h6>Song Title</h6>
            </div>
            <div class="artist">
              <h6>Artist Name</h6>
            </div>
            <div class="length">
              <h6>2:03</h6>
            </div>
            <div>
              <i class="fas fa-heart"></i>
            </div>`;

    })


    
}