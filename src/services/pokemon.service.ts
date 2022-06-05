import { Pokemon } from "../interfaces";

const baseURL = "https://pokemon-pichincha.herokuapp.com/pokemons";

export const getPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${baseURL}/?idAuthor=1`);
  const data = await response.json();
  return data;
};

export const createPokemon = async (pokemon: Pokemon): Promise<Pokemon> => {
  const response = await fetch(`${baseURL}/?idAuthor=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  });
  const data = await response.json();
  return data;
};

export const updatePokemon = async (
  id: number,
  pokemon: Pokemon
): Promise<Pokemon> => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  });
  const data = await response.json();
  return data;
};

export const deletePokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${baseURL}/${id}`,{method:'DELETE'});
  const data = await response.json();
  return data;
};
