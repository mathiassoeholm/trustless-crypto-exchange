import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AuthActions from '../modules/auth/actions';

const authActions = AuthActions();

const UserForm = props =>
	(
		<div>
			<TextField
				id="username"
				error={!!props.usernameError}
				label={props.usernameError || 'User'}
				margin="normal"
				value={props.username}
				onChange={props.onChangedUsername}
			/>
			<br />
			<TextField
				id="password"
				error={!!props.passwordError}
				label={props.passwordError || 'Passphrase'}
				type="password"
				autoComplete="current-password"
				margin="normal"
				value={props.password}
				onChange={props.onChangedPassword}
			/>
			<br />
			{this.props.children}
			<br />
			{ this.props.loginAttemptError &&
				<div>
					<Typography variant="subheading" color="error">{this.props.loginAttemptError}</Typography>
					<br />
				</div>
			}
			<Button variant="raised" color="primary" onClick={this.onClickedButton}>
				{this.props.buttonText}
			</Button>
		</div>
	);

UserForm.propTypes =
{
	onClickedButton: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired,
	usernameError: PropTypes.string,
	passwordError: PropTypes.string,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	onChangedUsername: PropTypes.func.isRequired,
	onChangedPassword: PropTypes.func.isRequired,
	loginAttemptError: PropTypes.string,
	children: PropTypes.node,
};

UserForm.defaultProps =
{
	usernameError: null,
	passwordError: null,
	loginAttemptError: null,
	children: [],
};

const mapStateToProps = state =>
	({
		username: state.auth.user ? state.auth.user.username : '',
		password: state.auth.password || '',
		usernameError: state.auth.usernameError,
		passwordError: state.auth.passwordError,
		loginAttemptError: state.auth.loginAttemptStatus ?
			state.auth.loginAttemptStatus.errorMessage :
			null,
	});

const mapDispatchToProps = dispatch =>
	({
		onChangedUsername: event => dispatch(authActions.changeUsername(event.target.value)),
		onChangedPassword: event => dispatch(authActions.changePassword(event.target.value)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
