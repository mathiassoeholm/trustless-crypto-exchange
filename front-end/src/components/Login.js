import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class Login extends React.Component
{
	constructor(props)
	{
		super(props)

		this.state =
		{
			username: ""
		}

		this.onChangeUsername = this.onChangeUsername.bind(this);
	}

	onChangeUsername(event)
	{
		this.setState({username: event.target.value});
	}

	render()
	{
		return (
			<div>
				<TextField
					id="username"
					label="User"
					margin="normal"
					value={this.state.username}
					onChange={this.onChangeUsername}/>
				<br/>
				<TextField
					id="password"
					label="Password"
					type="password"
					autoComplete="current-password"
					margin="normal"/>
				<br/>
				<Button variant="raised" color="primary">
					Login
				</Button>
			</div>
		)
	}
}

export default Login;
