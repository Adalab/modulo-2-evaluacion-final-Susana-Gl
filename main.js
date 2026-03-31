"use strict";
//QUERYSELECTORS

const AllSeries = document.querySelector (".js_AllSeries")
const SearchBtn = document.querySelector (".js_button-search")

//DATOS (variables)

let series = [];

fetch("https://api.tvmaze.com/search/shows?q=girls")
    .then(res => res.json())
    .then(data => {
        series = data
        renderSeries (series)
        console.log (data)
    })
    .catch ((error) => {

    });

//FUNCIONES

function renderSeries (series) {
    AllSeries.innerHTML += `<li class="card">
<article>
  <img
    class="card_img"
    src="${series.show.image}"
    alt="serie"
  />
  <h3 class="card_name">${series.name}</h3>
</article>
</li>`  

console.log (renderSeries)
}

//FALTA ESTO

function renderAll () {
for( const eachKitten of kittenArray ) {
  renderKitten(eachKitten.url, eachKitten.description, eachKitten.title, eachKitten.breed);
}
}

renderAll();


//FUNCIONES EVENTOS (handler)

//EVENTOS

//ACCIONES AL CARGAR LA PÁGINA