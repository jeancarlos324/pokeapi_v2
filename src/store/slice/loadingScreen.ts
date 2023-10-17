import { createSlice } from "@reduxjs/toolkit";

export const loadingScreenSlice = createSlice({
  name: "loadingscreen",
  initialState: false,
  reducers: {
    setLoadingScreen: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setLoadingScreen } = loadingScreenSlice.actions;
export default loadingScreenSlice.reducer;
