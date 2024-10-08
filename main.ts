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
        <div class="song" data-audio="${song.audioFile}" data-title="${song.title}" data-artist="${song.artist}" onclick="playSong('${song.audioFile}', '${song.title}', '${song.artist}')">
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

//dt: Song abspielen
function playSong(audioFile: string, title: string, artist: string) {
    const audioPlayer = document.getElementById("audio-player") as HTMLAudioElement;

    if (audioPlayer) {
      audioPlayer.src = audioFile;  
      audioPlayer.play().catch(err => {
        console.error('Fehler beim Abspielen der Musik:', err);
      });
    } else {
      console.error('Audio player element not found.');
    }

    // Aktualisieren der Song-Infos
    const songTitleElement = document.querySelector('.info h2');
    const songArtistElement = document.querySelector('.info h3');
    
    if (songTitleElement) {
        songTitleElement.textContent = title;
    } if (songArtistElement) {
        songArtistElement.textContent = artist;
    }
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
