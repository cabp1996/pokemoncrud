import { combineReducers } from "redux";

import { pokemonReducer, PokemonState } from "./pokemon.reducer";

export interface rootReducerTypes {
  pokemons: PokemonState;
}

export const rootReducer = combineReducers<rootReducerTypes>({
  pokemons: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
