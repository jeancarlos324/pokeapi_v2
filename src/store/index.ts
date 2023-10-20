import { configureStore } from "@reduxjs/toolkit";
import avatarSlice from "./slice/avatar.slice";
import loadingScreenSlice from "./slice/loadingScreen";
import typePokemonSlice from "./slice/typePokemon.slice";
import userTrainerSlice from "./slice/userTrainer.slice";
import pokemonListSlice from "./slice/pokemonList.slice";

const store = configureStore({
  reducer: {
    pokemon: typePokemonSlice,
    userTrainer: userTrainerSlice,
    avatar: avatarSlice,
    setLoadingScreen: loadingScreenSlice,
    pokemonListSlice,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
