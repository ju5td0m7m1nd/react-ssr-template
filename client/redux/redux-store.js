import {createStore} from 'redux';

const reducer = (state, action) => {
  switch(action.type) {
    case 'add_comment': {
      return Object.assign(state, {comment: action.payload});
    }
    default:
      return state;
  }
}

export default (initialState) => createStore(reducer, initialState)
