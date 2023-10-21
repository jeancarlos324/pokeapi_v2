import { configureStore } from "@reduxjs/toolkit";
import avatarSlice from "./slice/avatar.slice";
import loadingScreenSlice from "./slice/loadingScreen";
import typePokemonSlice from "./slice/typePokemon.slice";
import colorPokemonSlice from "./slice/colorPokemon.slice";
import habitatPokemonSlice from "./slice/habitatPokemon.slice";
import userTrainerSlice from "./slice/userTrainer.slice";
import pokemonListSlice from "./slice/pokemonList.slice";
import numberPage from "./slice/numberPage.slice";

const store = configureStore({
  reducer: {
    typePokemonSlice,
    colorPokemonSlice,
    habitatPokemonSlice,
    userTrainer: userTrainerSlice,
    avatar: avatarSlice,
    setLoadingScreen: loadingScreenSlice,
    pokemonListSlice,
    numberPage,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
