import React from 'react';
import 'typeface-roboto';
import { Provider } from 'react-redux';

import ResponsiveDrawer from './components/ResponsiveDrawer';
import './App.css';
import reduxStore from './redux/store';

const classes = {};

const App = () =>
{
	return (
		<div className="App">
			<Provider store={reduxStore}>
				<ResponsiveDrawer classes={classes} theme={{}} title="Secure Ethereum Exchange" />
			</Provider>
		</div>
	);
};

export default App;
