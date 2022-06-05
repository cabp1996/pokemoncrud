import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducers/root.reducer";
import { useForm } from "../hooks";
import { useEffect } from "react";
import {
  hidePokemonForm,
  requestCreatePokemonAction,
  requestUpdatePokemonAction,
} from "../actions";

import { Pokemon } from "../interfaces";
import "./PokemonForm.scss";

export const PokemonForm = () => {
  const dispatch = useDispatch();

  const { selectedPokemon } = useSelector((state: RootState) => state.pokemons);

  const [formValues, handleInputChange, setValues] = useForm({
    name: "",
    image: "",
    attack: 0,
    defense: 0,
  });

  const { name, image, attack, defense } = formValues;

  useEffect(() => {
    if (selectedPokemon) {
      setValues({
        name: selectedPokemon.name,
        image: selectedPokemon.image,
        attack: selectedPokemon.attack,
        defense: selectedPokemon.defense,
      });
    } else {
      setValues({
        name: "",
        image: "",
        attack: 0,
        defense: 0,
      });
    }
  }, [selectedPokemon, setValues]);

  const handleHideForm = () => {
    dispatch(hidePokemonForm());
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pokemonToSave: Pokemon = {
      name,
      attack: Number(attack),
      defense: Number(defense),
      hp: 100,
      idAuthor: 1,
      image,
      type: "normal",
    };

    if (selectedPokemon === null) {
      dispatch(requestCreatePokemonAction(pokemonToSave));
    } else {
      dispatch(requestUpdatePokemonAction(selectedPokemon.id, pokemonToSave));
    }
  };

  const isSaveButtonDisabled = (): boolean => {
    return name === "" || image === "";
  };

  return (
    <div className="form-container">
      <div className="title">
        <h4>{selectedPokemon ? "Editar pokemon" : "Nuevo pokemon"}</h4>
      </div>

      <form onSubmit={handleSubmitForm}>
        <div className="form-grid">
          <div className="form-control">
            <label htmlFor="inputName">Nombre:</label>
            <input
              className="form-input"
              id="inputName"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="inputAttack">Ataque:</label>
            <input
              id="inputAttack"
              className="range-input"
              type="range"
              min="0"
              max="100"
              name="attack"
              value={attack}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="inputImage">Imagen:</label>
            <input
              className="form-input"
              id="inputImage"
              type="text"
              name="image"
              value={image}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="inputDefense">Defensa:</label>
            <input
              id="inputDefense"
              className="range-input"
              type="range"
              min="0"
              max="100"
              name="defense"
              value={defense}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="buttons-container">
          <button
            className="main-button mr-8"
            disabled={isSaveButtonDisabled()}
            type="submit"
          >
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Guardar
          </button>
          <button className="main-button" onClick={handleHideForm}>
            <i className="fa fa-times" aria-hidden="true"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
