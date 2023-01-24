import axios from 'axios'
import { characterActions } from '../reducers/characterReducer'

function getCharacters() {
  return async (dispatch) => {
    const api = await axios.get(`/character`)

    dispatch(characterActions.getCharacters({
      characters: api.data
    }))
  }
}

export const charcterAction = {
  getCharacters
}