import { createSlice } from "@reduxjs/toolkit";
import { NamedAPIResource } from "pokenode-ts";
import { axiosInstance } from "../../services/axiosInstance";
import { AppDispatch } from "..";

type InitialProps = NamedAPIResource[] | [];

const initialState: InitialProps = [];
export const colorPokemonSlice = createSlice({
  name: "typePokemon",
  initialState: initialState,
  reducers: {
    setColorPokemon: (_state, actions) => {
      return actions.payload;
    },
  },
});
export const getColorPokemon = () => (dispatch: AppDispatch) => {
  axiosInstance
    .get(`/types`)
    .then(({ data }) => {
      dispatch(setColorPokemon(data.results));
    })
    .catch(() => dispatch(setColorPokemon(initialState)));
};
export const { setColorPokemon } = colorPokemonSlice.actions;
export default colorPokemonSlice.reducer;
