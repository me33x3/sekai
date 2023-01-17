import { configureStore } from '@reduxjs/toolkit'
import { characterReducer } from './reducers'

const store = configureStore({
  reducer: {
    character: characterReducer
  }
})

export default store