import { Pokemon } from "../interfaces";
import {
  createPokemon,
  deletePokemon,
  getPokemons,
  updatePokemon,
} from "../services";
import { pokemonTypes } from "../types";
import Swal from "sweetalert2";

export const showPokemonForm = () => ({
  type: pokemonTypes.showForm,
});

export const hidePokemonForm = () => ({
  type: pokemonTypes.hideForm,
});

export const selectPokemonAction = (pokemon: Pokemon) => ({
  type: pokemonTypes.selectOne,
  payload: pokemon,
});

export const searchPokemon = (searchFilter: string) => ({
  type: pokemonTypes.search,
  payload: searchFilter,
});

export const requestCreatePokemonAction = (pokemon: Pokemon) => {
  return async (dispatch: any) => {
    try {
      const newPokemon: Pokemon = await createPokemon(pokemon);
      dispatch(createPokemonAction(newPokemon));
      Swal.fire("Pokemon creado!", "", "success");
    } catch (error) {
      Swal.fire("Error en la creación.", "", "error");
    }
  };
};

export const createPokemonAction = (newPokemon: Pokemon) => ({
  type: pokemonTypes.create,
  payload: newPokemon,
});

export const requestUpdatePokemonAction = (id: number, pokemon: Pokemon) => {
  return async (dispatch: any) => {
    try {
      const updatedPokemon: Pokemon = await updatePokemon(id, pokemon);
      dispatch(updatePokemonAction(updatedPokemon));
      Swal.fire("Pokemon actualizado!", "", "success");
    } catch (error) {
      Swal.fire("Error en la actualización.", "", "error");
    }
  };
};

export const updatePokemonAction = (updatedPokemon: Pokemon) => ({
  type: pokemonTypes.update,
  payload: updatedPokemon,
});

export const requestDeletePokemonAction = (id: number) => {
  return async (dispatch: any) => {
    try {
      await deletePokemon(id);
      dispatch(deletePokemonAction(id));
      Swal.fire("Pokemon eliminado!", "", "success");
    } catch (error) {
      Swal.fire("Error al eliminar.", "", "error");
    }
  };
};

export const deletePokemonAction = (id: number) => ({
  type: pokemonTypes.delete,
  payload: id,
});

export const requestGetPokemonsListAction = () => {
  return async (dispatch: any) => {
    try {
      const pokemons = await getPokemons();
      dispatch(loadPokemonsAction(pokemons));
    } catch (error) {
      Swal.fire("Ocurrió un problema al consultar los pokemons.", "", "error");
    }
  };
};

export const loadPokemonsAction = (pokemons: Pokemon[]) => ({
  type: pokemonTypes.load,
  payload: pokemons,
});
