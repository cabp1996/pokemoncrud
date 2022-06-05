import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestDeletePokemonAction,
  requestGetPokemonsListAction,
  selectPokemonAction,
} from "../actions";
import { RootState } from "../reducers/root.reducer";
import { Pokemon } from "../interfaces";
import "./PokemonTable.scss";

export const PokemonTable = () => {
  const dispatch = useDispatch();

  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const { pokemons, filterSearch } = useSelector(
    (state: RootState) => state.pokemons
  );

  useEffect(() => {
    dispatch(requestGetPokemonsListAction());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    if (pokemons.length > 0) {
      const filtered: Pokemon[] = pokemons.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(filterSearch.toLocaleLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [filterSearch, pokemons]);

  const handleSelectPokemonToUpdate = (pokemon: Pokemon) => {
    dispatch(selectPokemonAction(pokemon));
  };

  const handleDeletePokemon = async (id: number) => {
    dispatch(requestDeletePokemonAction(id));
  };

  return (
    <table className="pokemon-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Ataque</th>
          <th>Defensa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredPokemons.map((pokemon, index) => (
          <tr key={index}>
            <td>{pokemon.name}</td>
            <td>
              <img
                src={pokemon.image ? pokemon.image : "/images/notfound.png"}
                alt={pokemon.name}
              />
            </td>
            <td>{pokemon.attack}</td>
            <td>{pokemon.defense}</td>
            <td>
              <div className="td-actions">
                <button
                  className="btn-icon"
                  onClick={() => handleSelectPokemonToUpdate(pokemon)}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>

                <button
                  className="btn-icon"
                  onClick={() => handleDeletePokemon(pokemon.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
