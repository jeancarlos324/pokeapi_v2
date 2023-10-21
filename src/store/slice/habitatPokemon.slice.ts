import { createSlice } from "@reduxjs/toolkit";
import { NamedAPIResource } from "pokenode-ts";
import { axiosInstance } from "../../services/axiosInstance";
import { AppDispatch } from "..";

type InitialProps = NamedAPIResource[] | [];

const initialState: InitialProps = [];
export const habitatPokemonSlice = createSlice({
  name: "typePokemon",
  initialState: initialState,
  reducers: {
    setHabitatPokemon: (_state, actions) => {
      return actions.payload;
    },
  },
});
export const getHabitatPokemon = () => (dispatch: AppDispatch) => {
  axiosInstance
    .get(`/pokemon-habitat`)
    .then(({ data }) => {
      dispatch(setHabitatPokemon(data.results));
    })
    .catch(() => dispatch(setHabitatPokemon(initialState)));
};
export const { setHabitatPokemon } = habitatPokemonSlice.actions;
export default habitatPokemonSlice.reducer;
