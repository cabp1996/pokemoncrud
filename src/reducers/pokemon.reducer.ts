import { Pokemon } from "../interfaces";
import { pokemonTypes } from "../types";

interface ActionType {
  type: string;
  payload?: any;
}

export interface PokemonState {
  filterSearch: string;
  selectedPokemon: Pokemon | null;
  pokemons: Pokemon[];
  showPokemonForm: boolean;
}

const initialState: PokemonState = {
  filterSearch: "",
  selectedPokemon: null,
  pokemons: [],
  showPokemonForm: false,
};

export const pokemonReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case pokemonTypes.showForm:
      return {
        ...state,
        showPokemonForm: true,
        selectedPokemon: null,
      };

    case pokemonTypes.hideForm:
      return {
        ...state,
        showPokemonForm: false,
        selectedPokemon: null,
      };

    case pokemonTypes.search:
      return {
        ...state,
        filterSearch: action.payload,
      };

    case pokemonTypes.selectOne:
      return {
        ...state,
        showPokemonForm: true,
        selectedPokemon: action.payload,
      };

    case pokemonTypes.load:
      return {
        ...state,
        pokemons: action.payload,
      };

    case pokemonTypes.create:
      const newPokemon: Pokemon = action.payload;
      return {
        ...state,
        showPokemonForm: false,
        pokemons: [
          ...state.pokemons.map((pokemon) => ({ ...pokemon })),
          newPokemon,
        ],
      };

    case pokemonTypes.update:
      const updatedPokemon: Pokemon = action.payload;
      return {
        ...state,
        showPokemonForm: false,
        pokemons: [
          ...state.pokemons.map((pokemon) => {
            if (pokemon.id === updatedPokemon.id) {
              return {
                ...updatedPokemon,
              };
            }

            return { ...pokemon };
          }),
        ],
      };

    case pokemonTypes.delete:
      const deletedId: number = action.payload;
      return {
        ...state,
        pokemons: state.pokemons.filter((pokemon) => pokemon.id !== deletedId),
      };

    default:
      return state;
  }
};
