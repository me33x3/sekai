import { configureStore } from '@reduxjs/toolkit'
import { characterReducer, cardReducer } from './reducers'

const store = configureStore({
  reducer: {
    character: characterReducer,
    card: cardReducer
  }
})

export default store