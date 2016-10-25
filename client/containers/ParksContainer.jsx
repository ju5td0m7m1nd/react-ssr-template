import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getList, clientRender } from '../../actions'

class ParksContainer extends Component {
  static fetchData = ({ store, limit, offset }) =>
    store.dispatch(getList({ limit, offset }))

  componentDidMount = () => {
    const { renderFromServer, clientRender, getList } = this.props

    renderFromServer ? clientRender() : getList({ limit: 10, offset: 99 })
  }

  render = () => {
    const { parks } = this.props
    return (
      <div>
        <h1>台北市公園列表</h1>
        {
          parks.map(park =>
            <div key={ park._id }>
              { park.ParkName }
            </div>
          )
        }
      </div>
    )
  }
}

ParksContainer.propTypes = {
  parks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.number.isRequired,
    ParkName: PropTypes.string.isRequired,
  })).isRequired,
  renderFromServer: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  parks: state.parks.list,
  renderFromServer: state.renderFromServer
})

export default connect(
  mapStateToProps,
  { getList, clientRender }
)(ParksContainer)
