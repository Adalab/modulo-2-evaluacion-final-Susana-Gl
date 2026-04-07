"use strict";

//QUERYSELECTORS

const AllSeries = document.querySelector(".js_AllSeries");
const SearchBtn = document.querySelector(".js_button-search");
const SearchSerie = document.querySelector(".js_search_input");
const FavouriteSection = document.querySelector(".js_ulFavourite");

//DATOS (variables)

const ImgVar = `https://placehold.co/210x295/f5f5f5/666666/?text=TV`;

//FUNCIONES

function handleLi(ev) {
  console.log(ev.currentTarget);
  ev.currentTarget.classList.toggle("favourite");
  console.log(ev.currentTarget.dataset.id);

  const TargetId = parseInt(ev.currentTarget.dataset.id);
  const clickedSerie = series.find(
    (eachSerieObj) => eachSerieObj.show.id === TargetId,
  ); //Busca el ID de cada objeto clickado, si no, devuelve undefined
  if (clickedSerie !== undefined) {
    console.log(clickedSerie);
    const li = renderOneSerie(clickedSerie);
    FavouriteSection.innerHTML += li;
  }
}

function renderOneSerie(series) {
  console.log(series);
  const html = `<li class="card" data-id=${series.show.id}>
<article>
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

//FUNCIONES EVENTOS (handler)

let series = [];

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

//EVENTOS

//ACCIONES AL CARGAR LA PÁGINA

//PRUEBAS
