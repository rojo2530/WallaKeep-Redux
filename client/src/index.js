import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bulma/css/bulma.css';
import './index.css';

import App from './App';
import { configureStore } from './store';
import { setUser } from './store/actions';

const user = {
  name: 'pepe',
  pass: '1234'
}
const store = configureStore();
store.dispatch(setUser(user));
console.log(store.getState());

ReactDOM.render(<App />, document.getElementById('root'));

