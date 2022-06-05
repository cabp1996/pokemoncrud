import { useDispatch } from "react-redux";
import { showPokemonForm, searchPokemon } from "../actions";
import { useEffect, useState } from "react";
import "./Header.scss";

export const Header = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    dispatch(searchPokemon(filter));
  }, [filter]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleShowPokemonForm = () => dispatch(showPokemonForm());

  return (
    <>
      <h1>Listado de Pokemon</h1>
      <div className="search-bar-container">
        <div className="search-input">
          <input
            className="form-input"
            placeholder="Buscar"
            type="text"
            value={filter}
            name="filter"
            onChange={handleChangeSearch}
          />
        </div>

        <button className="main-button" onClick={handleShowPokemonForm}>
          <i className="fa fa-plus" aria-hidden="true"></i> Nuevo
        </button>
      </div>
    </>
  );
};
