import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  LOGOUT
} from '../constants/actionTypes';
const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

const mapStateToProps = state => ({
  ...state.common,

});
function Headline() {
  window.localStorage.setItem('jwt', '');
}
const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li> */}

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            <i className="ion-compose"></i>&nbsp;Contact
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Profile
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/login`}
            className="nav-link">
            <img src={require('../img/profile.png')} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser}
          </Link>
        </li>
        <li className="nav-item">
          <a href={"/login"} onClick={Headline} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  
  render() {
    const userName = window.localStorage.getItem('jwt');
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={userName} />

          <LoggedInView currentUser={userName} />
        </div>
      </nav>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

