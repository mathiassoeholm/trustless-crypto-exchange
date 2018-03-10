import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import api from '../modules/auth/api';
import authActions from '../modules/auth/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>
({
	username: state.auth.user ? state.auth.user.username : ''
});


const mapDispatchToProps = (dispatch) =>
({
	onChangedUsername: (event) => dispatch(authActions.changeUsername(event.target.value))
});

class UserForm extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			password: ""
		};

		this.onChangedPassword = this.onChangedPassword.bind(this);
		this.onClickedButton = this.onClickedButton.bind(this);
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
					value={this.props.username}
					onChange={this.props.onChangedUsername}/>
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
		);
	}
}

UserForm.propTypes =
{
	onClickedButton: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
