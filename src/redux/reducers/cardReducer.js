import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: null,
  frames: null,
  attributes: null,
  rarity: null
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getCards(state, action) {
      state.cards = action.payload.cards
    },
    getCardsByType(state, action) {
      state.cards = action.payload.cards
    },
    getFrames(state, action) {
      state.frames = action.payload.frames
      state.attributes = action.payload.attributes
      state.rarity = action.payload.rarity
    }
  }
})

export const cardActions = cardSlice.actions
export default cardSlice.reducer