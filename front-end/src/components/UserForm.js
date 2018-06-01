import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import AuthActions from '../modules/auth/actions';

const authActions = AuthActions();

export class UserForm extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			password: '',
		};

		this.onChangedPassword = this.onChangedPassword.bind(this);
		this.onClickedButton = this.onClickedButton.bind(this);
	}

	onChangedPassword(event)
	{
		this.props.clearPasswordError();
		this.setState({ password: event.target.value });
	}

	onClickedButton()
	{
		this.props.onClickedButton(this.state.password);
	}

	render()
	{
		return (
			<div>
				<TextField
					id="username"
					error={!!this.props.usernameError}
					label={this.props.usernameError || 'User'}
					margin="normal"
					value={this.props.username}
					onChange={this.props.onChangedUsername}
				/>
				<br />
				<TextField
					id="password"
					error={!!this.props.passwordError}
					label={this.props.passwordError || 'Passphrase'}
					type="password"
					autoComplete="current-password"
					margin="normal"
					value={this.state.password}
					onChange={this.onChangedPassword}
				/>
				<br />
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
	buttonText: PropTypes.string.isRequired,
	usernameError: PropTypes.string,
	passwordError: PropTypes.string,
	username: PropTypes.string, // TODO: We get error if this is set as required, not sure why
	onChangedUsername: PropTypes.func.isRequired,
	clearPasswordError: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		username: state.auth.user ? state.auth.user.username : '',
		usernameError: state.auth.usernameError,
		passwordError: state.auth.passwordError,
	});

const mapDispatchToProps = dispatch =>
	({
		onChangedUsername: event => dispatch(authActions.changeUsername(event.target.value)),
		clearPasswordError: () => dispatch(authActions.clearPasswordError()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
