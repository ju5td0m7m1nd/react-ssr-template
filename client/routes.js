import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './index'
import HomePage from './containers/HomePage'
import ParksContainer from './containers/ParksContainer'

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={HomePage}/>
    <Route path='/parks' component={ParksContainer} />
  </Route>
)
