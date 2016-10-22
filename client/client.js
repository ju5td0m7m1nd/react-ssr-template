import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/redux-store'
import routes from './routes'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import {browserHistory} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const initialState = window.__INITIAL_STATE__

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme({userAgent: 'all'})}>
    <Provider store={store(initialState)}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
  </MuiThemeProvider>,
  document
)
