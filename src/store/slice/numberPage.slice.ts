import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

const numberPageSlice = createSlice({
  name: "pokemon-list",
  initialState,
  reducers: {
    setNumberPageSlice: (_state, actions) => {
      return actions.payload;
    },
  },
});

export const { setNumberPageSlice } = numberPageSlice.actions;
export default numberPageSlice.reducer;
