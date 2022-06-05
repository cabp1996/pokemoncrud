import React from "react";
import { useSelector } from "react-redux";
import { PokemonTable } from "../components";
import { PokemonForm } from "../components";
import { Header } from "../components";
import { RootState } from "../reducers/root.reducer";

export const PokemonsView = () => {
  const { showPokemonForm } = useSelector((state: RootState) => state.pokemons);

  return (
    <div className="main-container">
      <Header />
      <PokemonTable />
      {showPokemonForm && <PokemonForm />}
    </div>
  );
};
