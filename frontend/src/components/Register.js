import React from 'react';
import { connect } from 'react-redux';
import {
  INVALID_USER
} from '../constants/actionTypes';
const mapStateToProps = state => ({
  ...state.common,
  token: state.common.token,
  currentUser: state.common.currentUser,
});


const mapDispatchToProps = dispatch => ({
  onUserInvalid: value =>
  dispatch({ type: INVALID_USER, payload: value}),
});

class Register extends React.Component {
  // constructor() {
  //   super();
  // }
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (!token||token!=="Admin") {
      this.props.onUserInvalid();
    }
  }
  render() {
    return (
      <div className="auth-page">
        <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
                <h1>profile</h1>
            </div>
        </div>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
