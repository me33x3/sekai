import axios from 'axios'
import { cardActions } from '../reducers/cardReducer'

function getCards() {
  return async (dispatch) => {
    const api = await axios.get(`/card`)

    dispatch(cardActions.getCards({
      cards: api.data
    }))
  }
}

function getCardsByType(type) {
  return async (dispatch) => {
    const api = await axios.get(`/card/type/${type}`)

    dispatch(cardActions.getCardsByType({
      cards: api.data
    }))
  }
}

function getFrames() {
  return async (dispatch) => {
    const frameApi = axios.get(`/frame`)
    const attributeApi = axios.get(`/attribute`)
    const rarityApi = axios.get(`/rarity`)

    let [frames, attributes, rarity] = await Promise.all([
      frameApi,
      attributeApi,
      rarityApi
    ])

    dispatch(cardActions.getFrames({
      frames: frames.data,
      attributes: attributes.data,
      rarity: rarity.data
    }))
  }
}

export const cardAction = {
  getCards,
  getCardsByType,
  getFrames
}