'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <title>React Server Side Template</title>
        <link rel="stylesheet" href="css/base.css" />
        <script dangerouslySetInnerHTML={{__html: this.props.initialState}} />
      </head>
      <body>
      {this.props.children}
      <script src="scripts/polyfill.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
      <script src="scripts/bundle.js"></script>
      </body>
      </html>
    )
  }
}

var IndexState = function(state) {
	var stateJSON = JSON.stringify(state).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
	return {
		initialState: "window.__INITIAL_STATE__ = "+stateJSON
	}
}

export default connect(IndexState)(Index)
