import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { isUserAuth } from '../store/selectors';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    (isAuth) 
      ? <Component {...props} />
      : <Redirect to='/register' />
  )} />
);

function mapStateToProps(state) {
  return {
    isAuth: isUserAuth(state.user),
  }
}

export default connect(mapStateToProps)(PrivateRoute); 

