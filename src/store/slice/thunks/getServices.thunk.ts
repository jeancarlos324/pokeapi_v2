import { AppDispatch } from "../..";
import { axiosInstance } from "../../../services/axiosInstance";
import { setPokemonList } from "../pokemonList.slice";

export const getServices = () => async (dispatch: AppDispatch) => {
  const pokemonList = await axiosInstance
    .get("/pokemon?limit=600&offset=0")
    .then(({ data }) => data.results);
  dispatch(setPokemonList(pokemonList));
};
