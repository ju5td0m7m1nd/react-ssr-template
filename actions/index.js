import * as types from '../constants/ActionTypes'
import { browserHistory } from 'react-router'
import request from 'superagent'
import config from '../config'

export const clientRender = () => 
  ({ type: types.SET_SERVER_RENDER_FLAG_FALSE })

export const serverRender = () =>
  ({ type: types.SET_SERVER_RENDER_FLAG_TRUE })

export const getList = 
  ({ limit, offset }) =>
    dispatch =>
      new Promise((resolve, reject) =>
        request.
          get(`${config.endpoint}&limit=${limit}&offset=${offset}`).
          set({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }).
          end((err, res) => {
            if (!err) {
              let data = JSON.parse(res.text).result.records
              dispatch({
                type: types.GET_PARKS_LIST_SUCCESS,
                data
              })
              resolve()
            } else {
              reject(err)
            }
          }))
