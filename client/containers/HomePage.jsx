'use strict'
/**
 * Created by caimingxun on 2016/10/16.
 */

import React from 'react'
import {connect} from 'react-redux'

// component
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ]
    return (
      <section className="home-page" >
        <RaisedButton label="RSS" onTouchTap={this.handleOpen} secondary />
        <Dialog
          title="RSS Rocks!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Have fun with React Server Side !
        </Dialog>
      </section>
    )
  }
}

export default connect()(HomePage)
