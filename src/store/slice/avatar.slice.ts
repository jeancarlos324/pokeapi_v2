import { createSlice } from "@reduxjs/toolkit";

export const avatarSlice = createSlice({
  name: "username",
  initialState: "",
  reducers: {
    changeAvatar: (state,actions) =>{
      return actions.payload;
    }
  },
});

export const {changeAvatar} = avatarSlice.actions;
export default avatarSlice.reducer;
