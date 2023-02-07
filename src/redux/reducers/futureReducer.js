import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  future: null
}

const futureSlice = createSlice({
  name: 'future',
  initialState,
  reducers: {
    getFuture(state, action) {
      state.future = action.payload.future
    }
  }
})

export const futureActions = futureSlice.actions
export default futureSlice.reducer