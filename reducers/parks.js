import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const list = (state = [], action) => {
  switch (action.type) {
    case types.GET_PARKS_LIST_SUCCESS:
      return Object.assign([], action.data)
    default:
      return state
  }
}

export default combineReducers({
  list
})
