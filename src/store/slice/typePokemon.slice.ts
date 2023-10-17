import { createSlice } from "@reduxjs/toolkit"
export const typePokemonSlice = createSlice({
  name:"typePokemon",
  initialState:"",
  reducers:{
    typePokemon: (state,actions)=>{
      return actions.payload;
    }
  }
})
export const {typePokemon} = typePokemonSlice.actions;
export default typePokemonSlice.reducer;