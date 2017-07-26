import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  isLoggedIn,
} from '../../store/reducers';
import {
  requestLogout,
} from '../../store/session';
import './style.css';

class Header extends React.PureComponent {
  render() {
    const {
      isLoggedIn,
      logout,
    } = this.props;

    if (!isLoggedIn) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="header row">
        <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <div className="pull-right">
            <button type="button" className="btn btn-link btn-xs" onClick={logout}>
              <i className="glyphicon glyphicon-log-out margin-right-5" />
              Logout
            </button>
          </div>
          <h6>Heritage stock</h6>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    isLoggedIn: isLoggedIn(state),
  };
}

export const actionCreators = {
  logout: requestLogout,
};

export default connect(mapStateToProps, actionCreators)(Header);
