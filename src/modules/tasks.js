// src/services/tvmaze.js
const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

// 1. Obtener los datos generales de la serie
export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const response = await fetch(URL);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const data = await response.json();

  return {
    name: data.name,
    rating: data.rating?.average,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  };
};

// 2. Obtener los episodios y agruparlos por temporada
export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const response = await fetch(URL);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const episodes = await response.json();

  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating?.average ?? 0
  }));

  // Agrupa los episodios por el número de temporada usando Object.groupBy
  const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);
  return episodesBySeason;
};