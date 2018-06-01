import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AuthActions from '../modules/auth/actions';

const authActions = AuthActions();

const mapStateToProps = state =>
	({
		username: state.auth.user ? state.auth.user.username : '',
	});

const mapDispatchToProps = dispatch =>
	({
		onChangedUsername: event => dispatch(authActions.changeUsername(event.target.value)),
	});

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
					label="User"
					margin="normal"
					value={this.props.username}
					onChange={this.props.onChangedUsername}
				/>
				<br />
				<TextField
					id="password"
					label="Passphrase"
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
	username: PropTypes.string, // TODO: We get error if this is set as required, not sure why
	onChangedUsername: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
