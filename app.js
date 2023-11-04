//MOSTRAR Y OCULTAR CONTENIDO

// Inicializar constantes y llenarlas con los datos del body y del header de los menus
const allTabsBody = document.querySelectorAll(".tab-body-single");
const allTabsHead = document.querySelectorAll(".tab-head-single");

//Indica cual menu esta activo
let activeTab = 1;

//Funcion que se genera cada que se inicializa la app
const init = () => {
  showActiveTabBody();
  showActiveTabHead();
};

//Muestra el menu
const showActiveTabHead = () => {
  allTabsHead[activeTab - 1].classList.add("active-tab");
};

//Muestra la informacion
const showActiveTabBody = () => {
  hideAllTabBody();
  allTabsBody[activeTab - 1].classList.add("show-tab");
};

//Bloquea la informacion
const hideAllTabBody = () => {
  allTabsBody.forEach((singleTabBody) =>
    singleTabBody.classList.remove("show-tab")
  );
};

//Desactiva el menu
const hideAllTabHead = () => {
  allTabsHead.forEach((singleTabHead) =>
    singleTabHead.classList.remove("active-tab")
  );
};
//Funcion de escucha de cuando se inicializa
window.addEventListener("DOMContentLoaded", () => init());

//Funcion para cambiar el menu y el contenido activos
allTabsHead.forEach((singleTabHead) => {
  singleTabHead.addEventListener("click", () => {
    hideAllTabHead();
    activeTab = singleTabHead.dataset.id;
    showActiveTabHead();
    showActiveTabBody();
  });
});

//BUSQUEDA

//Creacion de variables que carguen la informacion del search y la lista de busqueda y variable vacia para cargar todos los datos de la API
const searchForm = document.querySelector(".app-header-search");
let allData;

//Obtener el valor de la busqueda
const getInputValue = (event) => {
  event.preventDefault();
  let searchText = searchForm.search.value;
  fetchMovies(searchText);
};

//Evento de escucha de la barra de busqueda
searchForm.addEventListener("submit", getInputValue);

//Busqueda en la API
//api key de uso de API en películas= 8284dc57
const fetchMovies = async (searchText) => {
  let url = `http://www.omdbapi.com/?apikey=8284dc57&t=${searchText}`;
  try {
    const response = await fetch(url);
    data = await response.json();
    showMovieDetails(data);
  } catch (error) {
    console.log(error);
  }
};

//Rellena de informacion a cada seccion de la película
const showMovieDetails = (info) => {

  console.log(info);

  document.querySelector(
    ".app-body-content-thumbnail"
  ).innerHTML = `<img src="${info.Poster}" alt="${info.Title}"/>`;

  document.querySelector(".detalles").innerHTML = `
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
  document.querySelector(".resenia").innerHTML =`
  <li>      
      <span>${info.Plot}</span>
  </li>
  `;
  let listado="";
  info.Ratings.forEach((rating) => {
    listado = listado + `
    <li>
    <div>
      <span>${rating.Source}</span>
    </div>      
    <span>${rating.Value}</span>
  </li>`;
  });

  document.querySelector(".calificacion").innerHTML =`
  <li>
    <div>
      <span>Galardones</span>
    </div>      
    <span>${info.Awards}</span>
  </li>${listado}
  `;
  

};
