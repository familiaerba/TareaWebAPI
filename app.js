//Formulario de busqueda
const searchMovieForm = document.querySelector(".app-search");


//Funcion de escucha de cuando se inicializa
window.addEventListener("DOMContentLoaded", () => initData());

//Se carga la pantalla con una imagen predefinida
const initData = () => {
  document.querySelector(
    ".image"
  ).innerHTML = `
      <h2>Poster </h2>
      <img src="https://www.pngfind.com/pngs/m/21-211553_camara-de-fotos-antigua-vector-hd-png-download.png" alt="Imágen de la película">
      `;
};

//Permite que reconozca el enter o click en la lupa para la busqueda
const getInputValue = (event) => {
  event.preventDefault();
  let searchText = searchMovieForm.search.value;
  fetchMovies(searchText);
};

searchMovieForm.addEventListener("submit", getInputValue);

//Busqueda en la API
//api key de uso de API en películas obtenia en https://www.omdbapi.com/es 8284dc57
const fetchMovies = async (searchText) => {
  let url = `https://www.omdbapi.com/?apikey=8284dc57&s=${searchText}`;
  try {
    const response = await fetch(url);
    data = await response.json();
    console.log(url);
    if (data.Error === "Movie not found!") {
      document.querySelector(
        ".resultSearch"
      ).innerHTML = `
          <h3>${data.Error}</h3>
          `;
    } else if (data.Error === "Too many results.") {
      document.querySelector(
        ".resultSearch"
      ).innerHTML = `
          <h3>${data.Error}</h3>
          `;
    } else {
      showMovieResult(data.Search)
    }
  } catch (error) {
    console.log(error);
  }
};

//Muestra todas la peliculas devueltas por la api que concidan con el texto
const showMovieResult = (info) => {
  listado = "";
  info.forEach((movie) => {
    listado = listado + `<div class="resultSearchPoster"><img src="${movie.Poster}" alt="${movie.Title}" onclick="fetchOneMovie('${movie.imdbID}')"/></div>`;
  });
  document.querySelector(
    ".resultSearch"
  ).innerHTML = `${listado}`;

}

//Obtiene la informacion de la pelicula seleccionada
const fetchOneMovie = async (searchText) => {
  let url = `https://www.omdbapi.com/?apikey=8284dc57&i=${searchText}`;
  try {
    const response = await fetch(url);
    data = await response.json();
    showMovieDetails(data);
  } catch (error) {
    console.log(error);
  }
};

//Muestra la informacion obtenida desde la api y crea la parte visual
const showMovieDetails = (info) => {

  console.log(info);

  document.querySelector(
    ".image"
  ).innerHTML = `
    <h2>${info.Title}</h2>
    <img src="${info.Poster}" alt="${info.Title}"/>
    `;

  document.querySelector(".info").innerHTML = `
    <h2>Información</h2>
    <li>
        <div>
            <span>Año</span>
        </div>
        <span>${info.Year}</span>
    </li>
    <li>
        <div>
            <span>Clasificación</span>
        </div>
        <span>${info.Rated}</span>
    </li>
    <li>
        <div>
            <span>Duración</span>
        </div>
        <span>${info.Runtime}</span>
    </li>
    <li>
        <div>
            <span>Género</span>
        </div>
        <span>${info.Genre}</span>
    </li>
    <li>
        <div>
            <span>Director</span>
        </div>
        <span>${info.Director}</span>
    </li>
    <li>
        <div>
            <span>Reparto</span>
        </div>
        <span>${info.Actors}</span>
    </li>
    <li>
        <div>
            <span>Lenguaje</span>
        </div>
        <span>${info.Language}</span>
    </li>
    `;

  document.querySelector(".plot").innerHTML = `
        <h2>Reseña</h2>
        <span>${info.Plot}</span>
    `;
  let listado = "<h2>Calificacion</h2>";
  info.Ratings.forEach((rating) => {
    listado = listado + `
      <div>
        <span>${rating.Source}</span>
      </div>
      <div>      
      <span>${rating.Value}</span>
      </div>
      `;
  });

  document.querySelector(".data").innerHTML = `
      <h2>Galardones</h2>   
      <span>${info.Awards}</span>
      ${listado}
    `;

};