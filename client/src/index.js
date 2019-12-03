import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bulma/css/bulma.css';
import './index.css';

import App from './App';
import { configureStore } from './store';
import { restoreUser, saveUser, deleteStorage } from './utils/storage';
import { Route, Redirect } from "react-router-dom";
import { initialState } from './store/reducers';

//Cargamos el Store con lo que hay en localstorage y si esta vacío usamos el estado inicial
const preloadedState = { ...initialState, user: restoreUser() || {} };
console.log('Estado inicial: ', preloadedState);

const store = configureStore(preloadedState);

//Cualquier cambio en el store lo guardamos en el localstorage
store.subscribe(() => {
  const { user } = store.getState();
  //Si el objeto user esta vacío, por ejemplo cuando hacemos un logout , lo eliminamos del localstorage
  if (Object.entries(user).length === 0) {
    return deleteStorage();
  }
  saveUser(user);
});

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (Object.entries(store.getState().user).length !== 0) 
      ? <Component {...props} />
      : <Redirect to='/register' />
  )} />
)

ReactDOM.render(<App store={store} />, document.getElementById('root'));

