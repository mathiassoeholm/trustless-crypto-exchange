import React, { Component } from 'react';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Typography from 'material-ui/Typography';
import 'typeface-roboto';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';

const classes = {};

const App = ()  =>
{
	return (
		<div className="App">
			<Provider store = {reduxStore}>
				<ResponsiveDrawer classes={classes} theme={{}} title="Secure Ethereum Exchange" />
			</Provider>
		</div>
	);
};

export default App; 
