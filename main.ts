//Musikdaten als Array hinzufügen

interface Artist {
    external_urls: { spotify: string}
}

//jl: toggle searchbar
const showSearchbar = () => {
  if (searchbar) searchbar.style.animationName === "hideSearchbar" ? searchbar.style.animationName = "showSearchbar" : searchbar.style.animationName = "hideSearchbar" ;

}
const searchBtn = document.getElementById("searchBtn")
const searchbar = document.getElementById("searchbar")
searchBtn?.addEventListener("click", showSearchbar)
