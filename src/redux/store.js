import { configureStore } from '@reduxjs/toolkit'
import { characterReducer, cardReducer, futureReducer } from './reducers'

const store = configureStore({
  reducer: {
    character: characterReducer,
    card: cardReducer,
    future: futureReducer
  }
})

export default store