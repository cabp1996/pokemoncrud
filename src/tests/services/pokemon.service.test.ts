import { pokemonsMockData } from "../mocks/initial-state.mock";
import {
  getPokemons,
  createPokemon,
  updatePokemon,
} from "../../services/pokemon.service";
import { Pokemon } from "../../interfaces/pokemon.interface";
import { deletePokemon } from "../../services/pokemon.service";

describe("pokemon.service", () => {
  test("should getPokemons return an array of pokemons", async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonsMockData),
      })
    ) as jest.Mock;

    const data = await getPokemons();

    expect(data).toEqual(pokemonsMockData);
  });

  test("should createPokemon return createdPokemon", async () => {
    const newPokemon: Pokemon = {
      attack: 100,
      defense: 100,
      hp: 100,
      type: "normal",
      idAuthor: 1,
      image: "image",
      name: "name",
    };

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...newPokemon, id: 2 }),
      })
    ) as jest.Mock;

    const data = await createPokemon(newPokemon);
    expect(data.id).not.toBeFalsy();
  });

  test("should updatePokemon return the updated pokemon", async () => {
    const pokemonToUpdate: Pokemon = {
      attack: 100,
      defense: 100,
      hp: 100,
      type: "normal",
      idAuthor: 1,
      image: "image",
      name: "name",
      id: 2,
    };

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonToUpdate),
      })
    ) as jest.Mock;

    const data = await updatePokemon(pokemonToUpdate.id, pokemonToUpdate);

    expect(data).toEqual(pokemonToUpdate);
  });

  test("should deletePokemon return the deleted pokemon", async () => {
    const pokemonToDelete: Pokemon = {
      attack: 100,
      defense: 100,
      hp: 100,
      type: "normal",
      idAuthor: 1,
      image: "image",
      name: "name",
      id: 2,
    };

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonToDelete),
      })
    ) as jest.Mock;

    const data = await deletePokemon(pokemonToDelete.id);

    expect(data).toEqual(pokemonToDelete);
  });
});
