import axios from "axios"
import { futureActions } from '../reducers/futureReducer'

function getFuture() {
  return async (dispatch) => {
    const api = await axios.get(`/future`)

    dispatch(futureActions.getFuture({
      future: api.data
    }))
  }
}

export const futureAction = {
  getFuture
}