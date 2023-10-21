import { AppDispatch } from "../..";
import { axiosInstance } from "../../../services/axiosInstance";
import { setColorPokemon } from "../colorPokemon.slice";
import { setHabitatPokemon } from "../habitatPokemon.slice";
import { setPokemonList } from "../pokemonList.slice";
import { setTypePokemon } from "../typePokemon.slice";

export const getServices = () => async (dispatch: AppDispatch) => {
  const pokemonList = await axiosInstance
    .get("/pokemon?limit=600&offset=0")
    .then(({ data }) => data.results);
  const pokemonTypeList = await axiosInstance
    .get("/type")
    .then(({ data }) => data.results);
  const pokemonColorList = await axiosInstance
    .get("/pokemon-color")
    .then(({ data }) => data.results);
  const pokemonHabitatList = await axiosInstance
    .get("/pokemon-habitat")
    .then(({ data }) => data.results);
  dispatch(setPokemonList(pokemonList));
  dispatch(setTypePokemon(pokemonTypeList));
  dispatch(setColorPokemon(pokemonColorList));
  dispatch(setHabitatPokemon(pokemonHabitatList));
};
