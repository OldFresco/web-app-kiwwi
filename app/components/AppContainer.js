import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBarContainer from './navbar/NavBarContainer'
import DashBar from './dashbar/DashBar'
import WelcomePage from './home/WelcomePage'
import Dashboard from './dashboard/Dashboard'
import LoadingIndicator from './shared/LoadingIndicator';
import LoadingPlaceholder from './shared/LoadingPlaceholder';

class AppContainer extends Component {
  render () {
    const { awaitingResponse, loggedIn } = this.props.state.app
    const { history, dispatch, location } = this.props
    return (
      <div>
        { !loggedIn ? (awaitingResponse ? <LoadingIndicator/> : <LoadingPlaceholder/>) : null } 
        { loggedIn ? 
          <DashBar 
            loggedIn={ loggedIn }
            awaitingResponse={ awaitingResponse }
            history={ history }
            dispatch={ dispatch }
            location={ location } 
          /> :
          <NavBarContainer 
            loggedIn={ loggedIn }
            awaitingResponse={ awaitingResponse }
            history={ history }
            dispatch={ dispatch }
            location={ location } 
          /> 
        }
        { loggedIn ? <Dashboard/> : <WelcomePage/> }
      </div>
    )
  }
}

AppContainer.propTypes = {
  state: React.PropTypes.object,
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

function select (state) {
  return {
    state: state
  }
}

export default connect(select)(AppContainer)