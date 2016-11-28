import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout, clearError, toggleLogin} from '../../actions';
import LoadingButton from '../../components/shared/LoadingButton';
import LoginForm from '../../components/Navbar/LoginModal/LoginForm';
import LoginButton from '../../components/Navbar/LoginButton';
import Menu from '../../components/Navbar/Menu';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Nav extends Component {
  constructor (props) {
    super(props)
    this.open = false;
    this._handleOpen = this._handleOpen.bind(this)
    this._handleClose = this._handleClose.bind(this)
  }

  _handleOpen () {
    this.props.dispatch(toggleLogin());
    this.open = !this.open;
  };

  _handleClose () {
    this.props.dispatch(toggleLogin());
    this.open = !this.open;
  };

  render () {

    const loginActions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this._handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this._handleClose}
        />,
      ];

    return (
      <div>
        <AppBar className='navbar-style'
          style={{
          backgroundColor: '#2BC677'
        }}
          iconElementLeft={ <Menu />}
          iconElementRight={<LoginButton onTouchTap={this._handleOpen} className='login'/>}
        />
         <Dialog 
          contentStyle={{ width: 300 }}
          title="Login"
          actions={loginActions}
          modal={false}
          open={this.open}
          onRequestClose={this._handleClose}
        >
          <LoginForm/>
        </Dialog>
      </div>
    )
  }
}

export default Nav
