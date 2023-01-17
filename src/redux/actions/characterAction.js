import axios from 'axios'
import { characterActions } from '../reducers/characterReducer'

function getCharacters() {
  return async (dispatch) => {
    const charactersApi = await axios.get(`/character`)

    dispatch(characterActions.getCharacters({
      characters: charactersApi.data
    }))
  }
}

export const charcterAction = {
  getCharacters
}