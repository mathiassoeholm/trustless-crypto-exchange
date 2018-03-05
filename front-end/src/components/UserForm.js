import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import api from '../api';

class UserForm extends React.Component
{
	constructor(props)
	{
		super(props)

		this.state =
		{
			password: ""
		}

		this.onChangedPassword = this.onChangedPassword.bind(this);
		this.onChangedUsername = this.onChangedUsername.bind(this);
		this.onClickedButton = this.onClickedButton.bind(this);
	}

	onChangedUsername(event)
	{
		this.props.appHandlers.onChangedUsername(event.target.value);
	}

	onChangedPassword(event)
	{
		this.setState({password: event.target.value});
	}
	
	onClickedButton(event)
	{
		this.props.onClickedButton(this.state.password);
	}

	render()
	{
		return (
			<div>
				<TextField
					id="username"
					label="User"
					margin="normal"
					value={this.props.appState.username}
					onChange={this.onChangedUsername}/>
				<br/>
				<TextField
					id="password"
					label="Password"
					type="password"
					autoComplete="current-password"
					margin="normal"
					value={this.state.password}
					onChange={this.onChangedPassword}/>
				<br/>
				<Button variant="raised" color="primary" onClick={this.onClickedButton}>
					{this.props.buttonText}
				</Button>
			</div>
		)
	}
}

UserForm.propTypes =
{
	appHandlers: PropTypes.object.isRequired,
	onClickedButton: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired,
	appState: PropTypes.object.isRequired
}

export default UserForm;
