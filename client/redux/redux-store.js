import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../../reducers'

export default (initialState) => {
  const middleware = process.env.NODE_ENV === 'production' ?
    [thunk] :
    [thunk, createLogger()]
  return createStore(reducer, initialState, applyMiddleware(...middleware))
}
