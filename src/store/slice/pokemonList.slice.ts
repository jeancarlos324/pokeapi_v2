import { createSlice } from "@reduxjs/toolkit";
import { NamedAPIResource } from "pokenode-ts";
import { AppDispatch } from "..";
import { axiosInstance } from "../../services/axiosInstance";

type InitialProps = NamedAPIResource[] | [];

const initialState: InitialProps = [];

const pokemonListSlice = createSlice({
  name: "pokemon-list",
  initialState,
  reducers: {
    setPokemonList: (_state, actions) => {
      return actions.payload;
    },
  },
});

export const getListPokemon = () => (dispatch: AppDispatch) => {
  axiosInstance
    .get(`/pokemon?limit=400&offset=0`)
    .then(({ data }) => {
      dispatch(setPokemonList(data.results));
    })
    .catch(() => dispatch(setPokemonList(initialState)));
};

export const { setPokemonList } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;
