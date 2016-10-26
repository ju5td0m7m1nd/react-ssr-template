global.navigator = { userAgent: 'all' }

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { match, RouterContext } from 'react-router'
import { Provider }from 'react-redux'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import configureStore from '../client/redux/redux-store'
import routes from '../client/routes'
import { serverRender } from '../actions'

import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.set('port', (process.env.PORT || 3000))

app.use('/', express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('*', (req, res) => {
  const muiTheme = getMuiTheme({
    userAgent: navigator.userAgent
  })
  const initialState = {}
  const store = configureStore(initialState)
  const limit = 10
  const offset = 20

  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
      const func = comp.fetchData
                   ? comp.fetchData({ store, limit, offset }) 
                   : Promise.resolve()

      func.
        then(() => store.dispatch(serverRender())).
        then(() => {
          res.send("<!DOCTYPE html>" +
            ReactDOMServer.renderToString(
              <MuiThemeProvider muiTheme={ muiTheme }>
                <Provider store={ store }>
                  <RouterContext { ...renderProps } />
                </Provider>
              </MuiThemeProvider>
            )
          )
        })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(app.get('port'), () => console.log('Server started: http://localhost:' + app.get('port') + '/'))
