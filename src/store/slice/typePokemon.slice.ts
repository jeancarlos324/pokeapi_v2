import { createSlice } from "@reduxjs/toolkit";
import { NamedAPIResource } from "pokenode-ts";
import { axiosInstance } from "../../services/axiosInstance";
import { AppDispatch } from "..";

type InitialProps = NamedAPIResource[] | [];

const initialState: InitialProps = [];
export const typePokemonSlice = createSlice({
  name: "typePokemon",
  initialState: initialState,
  reducers: {
    setTypePokemon: (_state, actions) => {
      return actions.payload;
    },
  },
});
export const getTypePokemon = () => (dispatch: AppDispatch) => {
  axiosInstance
    .get(`/types`)
    .then(({ data }) => {
      dispatch(setTypePokemon(data.results));
    })
    .catch(() => dispatch(setTypePokemon(initialState)));
};
export const { setTypePokemon } = typePokemonSlice.actions;
export default typePokemonSlice.reducer;
