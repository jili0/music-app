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
let currentSongIndex = 0;
let songs: Song[] = [];

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



//dt: Playlist erstellen
async function makePlaylist(): Promise<void> {
  const playlist = await fetchData();
  songs = playlist;

  const playlistElement = document.getElementById("playlist") as HTMLElement;

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
}
  


document.addEventListener("DOMContentLoaded", () => {
  makePlaylist();
});

//dt: Song abspielen
function playSong(index: number) {
  currentSongIndex = index;
  const song = songs[currentSongIndex];
    const audioPlayer = document.getElementById("audio-player") as HTMLAudioElement;
    const audioSource = document.getElementById("audio-source") as HTMLSourceElement;

    if (audioPlayer && song && audioSource) {
      audioSource.src = song.audioFile;  
      audioPlayer.load();
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
        songTitleElement.textContent = song.title;
    } if (songArtistElement) {
        songArtistElement.textContent = song.artist;
    }
}


// Play/Pause-Funktion für das Play-Icon
const playPauseBtn = document.getElementById("playpause") as HTMLElement;
const audioPlayer = document.getElementById("audio-player") as HTMLAudioElement;

const togglePlayPause = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.classList.replace("fa-play", "fa-pause"); // Icon zu Pause ändern
  } else {
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
const prevBtn = document.getElementById("prev") as HTMLInputElement;
const nextBtn = document.getElementById("next") as HTMLInputElement;
prevBtn.addEventListener("click", playPreviousSong);
nextBtn.addEventListener("click", playNextSong);



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


