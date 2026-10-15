import { getShowData, getEpisodeList } from "./services/tvmaze.js";

const ID = "2993"; // ID de la serie (ej. Vikings o la que prefieras)

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

try {
  // Peticiones asíncronas
  const show = await getShowData(ID);
  const seasons = await getEpisodeList(ID);

  // 1. Renderizar el Header de la serie
  $header.innerHTML = `
    <img class="poster" src="${show.image}" alt="${show.name}" />
    <h1>${show.name}</h1>
    <p>Valoración media: ${show.rating ?? 'N/A'}</p>
  `;

  // 2. Funciones para construir el HTML de episodios y temporadas
  const createEpisodeHTML = (episode) => {
    const ratingFloor = Math.floor(episode.rating || 0);
    return `<div class="episode rating-${ratingFloor}" title="Episodio ${episode.number} (Nota: ${episode.rating})">${episode.number}</div>`;
  };

  const createSeasonHTML = (seasonEpisodes, seasonNumber) => {
    const episodesHTML = seasonEpisodes.map(createEpisodeHTML).join("");
    return `
      <article class="season">
        <div class="season-header">T${seasonNumber}</div>
        ${episodesHTML}
      </article>
    `;
  };

  // 3. Recorrer las temporadas y pintarlas en el DOM
  const list = Object.values(seasons).map((season, index) => 
    createSeasonHTML(season, index + 1)
  );
  
  $episodes.innerHTML = list.join("");

} catch (error) {
  console.error("Hubo un error al cargar la serie:", error);
}