import {
  deletePokemonAction,
  hidePokemonForm,
  loadPokemonsAction,
  searchPokemon,
  selectPokemonAction,
  showPokemonForm,
} from "../../actions";
import { Pokemon } from "../../interfaces";
import { pokemonReducer } from "../../reducers/pokemon.reducer";
import { initialState, pokemonsMockData } from "../mocks/initial-state.mock";
import { createPokemonAction, updatePokemonAction } from '../../actions/pokemon.actions';

const pokemonsInitialState = initialState.pokemons;

describe("pokemon.reducer", () => {
  test("should return default state", () => {
    const result = pokemonReducer(pokemonsInitialState, { type: "undefined" });
    expect(result).toEqual(pokemonsInitialState);
  });

  test("should delete a pokemon from pokemons list when delete actions", () => {
    const result = pokemonReducer(pokemonsInitialState, deletePokemonAction(1));
    expect(result.pokemons).not.toHaveLength(2);
  });

  test("should set showForm to true when show form actions is dispatched", () => {
    const result = pokemonReducer(pokemonsInitialState, showPokemonForm());
    expect(result.showPokemonForm).toBeTruthy();
  });

  test("should set showForm to false when hide form actions is dispatched", () => {
    const result = pokemonReducer(pokemonsInitialState, hidePokemonForm());
    expect(result.showPokemonForm).toBeFalsy();
  });

  test("should set filterSearch text when search action is dispatched", () => {
    const result = pokemonReducer(pokemonsInitialState, searchPokemon("name"));
    expect(result.filterSearch).toEqual("name");
  });

  test("should selectOne set select pokemon and show pokemon form when select one pokemon actions is dispatched", () => {
    const selectPokemon = pokemonsMockData[0];
    const result = pokemonReducer(
      pokemonsInitialState,
      selectPokemonAction(selectPokemon)
    );
    expect(result.showPokemonForm).toBeTruthy();
    expect(result.selectedPokemon).toEqual(selectPokemon);
  });

  test("should load set select pokemons list when load actions is dispatched", () => {
    const pokemonsList = pokemonsMockData;
    const result = pokemonReducer(
      pokemonsInitialState,
      loadPokemonsAction(pokemonsList)
    );
    expect(result.pokemons).toHaveLength(pokemonsList.length);
  });

  test("should create add new pokemon to pokemons list when create pokemon action is dispatched", () => {
    const newPokemon: Pokemon = {
      attack: 100,
      defense: 100,
      hp: 100,
      idAuthor: 1,
      image: "image",
      name: "name",
      type: "normal",
      id: 10,
    };
    const result = pokemonReducer(
      pokemonsInitialState,
      createPokemonAction(newPokemon)
    );
    expect(result.pokemons).toContain(newPokemon);
  });

  test("should update the selected pokemon when update pokemon action is dispatched", () => {
    const pokemonToupdate: Pokemon = {
      attack: 100,
      defense: 100,
      hp: 100,
      idAuthor: 1,
      image: "image",
      name: "nameUpdated",
      type: "normal",
      id: 1,
    };
    const result = pokemonReducer(
      pokemonsInitialState,
      updatePokemonAction(pokemonToupdate)
    );
    expect(result.pokemons).toContainEqual(pokemonToupdate);
  });
});
