import {createStore} from 'redux'

const reducer = (state, action) => {
  switch(action.type) {
    case 'some_action': {
      return {...state, reactRocks: action.payload }
    }
    default:
      return state
  }
}

export default (initialState) => createStore(reducer, initialState)
