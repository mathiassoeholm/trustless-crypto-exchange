import React, { Component } from 'react';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Typography from 'material-ui/Typography';
import 'typeface-roboto'
import './App.css';
import Login from './components/Login';
import Create from './components/Create';
import CreateUserIcon from 'material-ui-icons/Face';
import LoginIcon from 'material-ui-icons/VpnKey';

const classes = {}

class App extends Component
{
  render()
  {
    return (
      <div className="App">
      	<ResponsiveDrawer classes={classes} theme={{}} title="Secure Ethereum Exchange">
			<Create title="Create User" icon={<CreateUserIcon/>}/>
			<Login title="Login" icon={<LoginIcon/>}/>
		</ResponsiveDrawer>
      </div>
    );
  }
}

export default App;
