import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
      setUser: (state,action) =>{
        state.push(action.payload)
      },
      destroyUser: (state,action) => {
          state.length = 0
      }
  },
  
});

export const {setUser ,destroyUser} = userSlice.actions;

export default userSlice.reducer;