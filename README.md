# React Server Side Render Template

## Synopsis

A rss template with es6, redux, react-router, material-ui.

## Motivation

Ran into some react server side render issue related to Maerial-ui and more,<br />
took me few days to build it up.<br />
<br />
So I turn it into a template for others who also has the requirement about<br />
React Server Side Render.

## Installation

###NPM

    npm install
    npm start
###Yarn

    // if you don't have one, you should give it a try > < 
    npm install -g yarn
    yarn
    npm start

## Example

server render without any fetching data or loading data

    http://localhost:3000/

fetching data before server render

    http://localhost:3000/parks

## How does server rendering work?

The story begins at `server.js`. Here, we use `express` as web framework. When a request comes in, the server passes the request object to `match`, which is a function of `react-router`, to do the actual routing. The second argument of `match` is a callback function.

This callback function does the following:

1. Respond to client immediately if there is any error or redirection.
2. Access the wrapped react component (in this example app, this is a redux container) and assign it to `comp`.
3. Access the predefined static function `fetchData` (this is where fetching actually happens) and assign it to `func`. If `fetchData` is not defined, then assign a resolved promise to `func`.
4. Execute `func` and chain it with some custom functions and the responding action. By using `renderToString`, we can export a react component to html string.

```javascript
// server.js

import express from 'express'

// ...

app.get('*', (req, res) => {
  // ...

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
```

```javascript
// ParksContainer.js
class ParksContainer extends Component {
  static fetchData = ({ store, limit, offset }) =>
    store.dispatch(getList({ limit, offset }))

  // ...
  }
```
    
## Thanks

Thanks to [davidjuin0519](https://github.com/davidjuin0519) for the implementation and example of fetching data.

## License

MIT
