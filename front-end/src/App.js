import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Typography from 'material-ui/Typography';
import 'typeface-roboto'
import './App.css';

const classes = {}

class App extends Component {
  render() {
    return (
      <div className="App">
      <ResponsiveDrawer classes={classes} theme={{}} title="Secure Ethereum Exchange">
       <TextField
          id="username"
          label="User"
          margin="normal"/>
        <br/>
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <br/>
        <Button variant="raised" color="primary">
          Login
        </Button>
        </ResponsiveDrawer>
      </div>
    );
  }
}

export default App;
