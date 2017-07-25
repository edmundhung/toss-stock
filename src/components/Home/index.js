import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';
import {
  isLoggedIn,
  isLoggingIn,
} from '../../store/reducers';
import {
  requestLogin,
} from '../../store/session';
import './style.css';

class Home extends React.PureComponent {
  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    const {
      // state
      defaultEmail,
      isLoggedIn,
      isLoggingIn,

      // actionCreators
      login,
    } = this.props;

    if (isLoggedIn) {
      return (
        <Redirect to="/stocks" />
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2 text-center">
            <h3>Tak Oi Secondary School</h3>
            <h1>Heritage Stock<br/>Management System</h1>
          </div>
          <div className="col-xs-4 col-xs-offset-4">
            <div className="well">
              <LoginForm
                defaultEmail={defaultEmail}
                onSubmit={login}
                disabled={isLoggingIn}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export function mapStateToProps(state) {
  return {
    defaultEmail: 'librarian@takoi.edu.hk',
    isLoggingIn: isLoggingIn(state),
    isLoggedIn: isLoggedIn(state),
  };
}

export const actionCreators = {
  login: requestLogin,
};

export default connect(mapStateToProps, actionCreators)(Home);
