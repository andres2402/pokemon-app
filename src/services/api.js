const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = async (page = 1, limit = 20) => {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(
      `${API_BASE_URL}?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Error al obtener la lista de Pokémon");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    return [];
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${name}`);

    if (!response.ok) {
      throw new Error(`Error al obtener los detalles del Pokémon ${name}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener los detalles del Pokémon ${name}:`, error);
    throw error;
  }
};
