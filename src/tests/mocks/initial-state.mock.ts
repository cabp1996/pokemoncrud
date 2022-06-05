import { RootState } from "../../reducers/root.reducer";
import { Pokemon } from "../../interfaces/pokemon.interface";

export const pokemonsMockData: Pokemon[] = [
  {
    id: 1,
    name: "name1",
    image: "image1",
    type: "normal",
    hp: 100,
    attack: 50,
    defense: 50,
    idAuthor: 1,
  },
  {
    id: 2,
    name: "name2",
    image: "",
    type: "normal",
    hp: 100,
    attack: 50,
    defense: 50,
    idAuthor: 1,
  },
];

export const initialState: RootState = {
  pokemons: {
    filterSearch: "",
    pokemons: [...pokemonsMockData],
    selectedPokemon: null,
    showPokemonForm: false,
  },
};

export const initialStateToUpdate: RootState = {
  pokemons: {
    filterSearch: "",
    pokemons: [...pokemonsMockData],
    selectedPokemon: pokemonsMockData[0],
    showPokemonForm: true,
  },
};
