import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  characters: null
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    getCharacters(state, action) {
      state.characters = action.payload.characters
    }
  }
})

export const characterActions = characterSlice.actions
export default characterSlice.reducer