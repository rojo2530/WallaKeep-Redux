import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bulma/css/bulma.css';
import './index.css';

import App from './App';
import { configureStore } from './store';
import { restoreUser, saveUser } from './utils/storage';

const initialState = {
  filter: {},
  user: {},
}
//Cargamos el Store con lo que hay en localstorage y si esta vacío usamos el estado inicial
const preloadedState = restoreUser() ||initialState;
console.log('Estado inicial: ', preloadedState);

const store = configureStore(preloadedState);

//Cualquier cambio en el store lo guardamos en el localstorage
store.subscribe(() => {
  const { user } = store.getState();
  saveUser(user);
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));

