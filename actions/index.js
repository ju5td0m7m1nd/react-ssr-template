import * as types from '../constants/ActionTypes'
import { browserHistory } from 'react-router'
import request from 'superagent'
import config from '../config'

export function receiveProducts(products) {
  return {
    type: types.RECEIVE_PRODUCTS,
    products
  }
}

export function getAllProducts(cookie) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      if (cookie) {
        headers['cookie'] = cookie
      }
      request.
        get(`${config.domain}/products.json`).
        withCredentials().
        set(headers).
        end((err, res) => {
          if (!err) {
            let data = JSON.parse(res.text)
            dispatch(receiveProducts(data))
            resolve(receiveProducts(data))
          } else {
            reject(err)
          }
        })
    })
  }
}
