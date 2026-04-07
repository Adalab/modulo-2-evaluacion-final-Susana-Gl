"use strict";

//QUERYSELECTORS

const AllSeries = document.querySelector(".js_AllSeries");
const SearchBtn = document.querySelector(".js_button-search");
const SearchSerie = document.querySelector(".js_search_input");
const FavouriteSection = document.querySelector(".js_ulFavourite");

//DATOS (variables)

let series = [];
const ImgVar = `https://placehold.co/210x295/f5f5f5/666666/?text=TV`;
let favouritesSeries = [];

//FUNCIONES

function handleLi(ev) {
  console.log(ev.currentTarget);
  ev.currentTarget.classList.toggle("favourite");
  console.log(ev.currentTarget.dataset.id);

  //RECUPERO EL ID DEL LI EN EL QUE CLICKO
  const TargetId = parseInt(ev.currentTarget.dataset.id);
  //BUSCO EL OBJETO CON LOS DATOS DEL ARRAY, USANDO EL ID DEL LI DONDE SE HA HECHO CLICK
  const clickedSerie = series.find(
    (eachSerieObj) => eachSerieObj.show.id === TargetId,
  );

  //SI ENCUENTRA DATOS
  if (clickedSerie !== undefined) {
    //BUSCA LA SERIE EN FAVS
    const favIndex = favouritesSeries.find(
      (eachObj) => eachObj.show.id === clickedSerie.show.id,
    );

    /*  NO FUNCIONA
    if (favIndex >= 0) {
      //YA ESTÁ EN FAVORITOS
      favouritesSeries.splice(favIndex, 1);
    } else {
      //NO ESTÁ EN FAVORITOS
      favouritesSeries.push(clickedSerie);
    }
    */

    localStorage.setItem("favs", JSON.stringify(favouritesSeries));
    console.log(clickedSerie);
    //GENERA LI
    const li = renderOneSerie(clickedSerie);
    //SE PINTA EN LA PAGINA EN LA SECCION DE FAVORITOS
    FavouriteSection.innerHTML += li;
  }
}

function renderOneSerie(series) {
  const favIndex = favouritesSeries.find(
    (eachObj) => eachObj.show.id === series.show.id,
  );
  const favClass = favIndex >= 0 ? "favourite" : "";
  console.log(series);
  const html = `<li class="card ${favClass}" data-id="${series.show.id}">
<article class ="css_cards">
  <img
    class="card_img"
    src="${series.show.image?.original || ImgVar}"
    alt="serie"
  />
  <h3 class="card_name">${series.show.name}</h3>
</article>
</li>`;

  return html;
}

function renderAllFavourites() {
  let html = "";

  for (const eachElement of favouritesSeries) {
    html += renderOneSerie(eachElement);
  }
  FavouriteSection.innerHTML = html;
}

//FUNCIONES EVENTOS (handler)

function handleClickSeries(event) {
  event.preventDefault();
  fetch(`https://api.tvmaze.com/search/shows?q=${SearchSerie.value}`)
    .then((res) => res.json())
    .then((data) => {
      series = data;
      let html = "";

      for (const eachElement of series) {
        html += renderOneSerie(eachElement);
      }
      AllSeries.innerHTML = html;

      const allLi = document.querySelectorAll(".card");
      for (const li of allLi) {
        li.addEventListener("click", handleLi);
      }
      console.log(allLi);
    });
}

SearchBtn.addEventListener("click", handleClickSeries);

//RECUPERA LOS FAVS DEL LS
function retrieveFavs() {
  const favouritesFromLS = JSON.parse(localStorage.getItem("favs"));
  //SI HAY FAVS, LOS GUARDA EN LA VARIABLE
  if (favouritesFromLS) {
    favouritesSeries = favouritesFromLS;
    renderAllFavourites();
  }
}

retrieveFavs();
//EVENTOS

//ACCIONES AL CARGAR LA PÁGINA
