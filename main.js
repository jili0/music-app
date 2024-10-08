"use strict";
//Musikdaten als Array hinzufügen
//jl: toggle searchbar
const showSearchbar = () => {
    if (searchbar)
        searchbar.style.animationName === "hideSearchbar" ? searchbar.style.animationName = "showSearchbar" : searchbar.style.animationName = "hideSearchbar";
};
const searchBtn = document.getElementById("searchBtn");
const searchbar = document.getElementById("searchbar");
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", showSearchbar);
