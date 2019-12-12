import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { UserProvider } from './contexts/user';
import { Provider } from 'react-redux';

import Adverts from './components/Adverts';
import Register from './components/Register';
import ManageAdvert from './components/ManageAdvert';
import DetailAdvert from './components/DetailAdvert/'
import ErrorBoundary from './components/ErrorBoundary';
import Error404 from './components/Error404';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

export default function App({ store, ...props }) {
	return (
		<ErrorBoundary >
			<Provider store={store}>	
				<Router>
					<Switch>
						<PrivateRoute exact path='/' component={Adverts} />
						<Route exact path='/register' component={Register} />
						<PrivateRoute exact path='/advert/detail/:id' component={DetailAdvert} />
						<PrivateRoute key='add-advert' exact path='/advert/create' component={ManageAdvert} />
						<PrivateRoute key='edit-advert' exact path='/advert/edit/:id' component={ManageAdvert} />
						<Route component={Error404}/>
					</Switch>
				</Router>
			</Provider>
		</ErrorBoundary>  
	);
}


