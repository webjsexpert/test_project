import ListErrors from './ListErrors';
import React from 'react';

// import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (userInfo) =>
    dispatch({ type: LOGIN, payload: userInfo}),
  
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {   
    const userInfo=[];
    super();
    this.state = { error: '' };
    this.changeEmail = ev => {
      this.setState({error: ""});
      this.props.onChangeEmail(ev.target.value);
    }
    this.changePassword = ev => {
      this.setState({error: ""});
      this.props.onChangePassword(ev.target.value);
    }
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      if(email==="Admin"&&password==="test1A"){
        
        userInfo['userName']=email;
        userInfo['password']=password;
        this.props.onSubmit(userInfo);
      }else{
        this.setState({error: "username or password invalid"});
      }
      
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                {/* <Link to="/register">
                  Need an account?
                </Link> */}
              </p>

              <ListErrors errors={this.state.error} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
