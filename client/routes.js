import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Index from './index';

import HomePage from './containers/HomePage';

const routes = (
    <Route path="/" component={Index}>
      <IndexRoute component={HomePage}/>
    </Route>
)

export default routes;
