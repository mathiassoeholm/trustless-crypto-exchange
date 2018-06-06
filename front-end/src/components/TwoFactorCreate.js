import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';
import LoginAttemptError from './LoginAttemptError';
import QRCode from './QRCode';

const authActions = AuthActions();

const TwoFactorCreate = props =>
	(
		<div>
			<QRCode data={props.qrData} />
			<Typography variant="body1"><b>Secret:</b> {props.secret}</Typography>
			<TextField
				id="2fatoken"
				label="2FA Token"
				value={props.token}
				onChange={props.onChanged2FAToken}
				margin="normal"
			/>
			<br />
			<LoginAttemptError />
			<Button variant="raised" color="primary" onClick={props.createUser}>
				Create
			</Button>
			<AuthProgress title="Creating user" />
		</div>
	);

TwoFactorCreate.propTypes =
{
	token: PropTypes.string.isRequired,
	secret: PropTypes.string.isRequired,
	qrData: PropTypes.string,
	onChanged2FAToken: PropTypes.func.isRequired,
	createUser: PropTypes.func.isRequired,
};

TwoFactorCreate.defaultProps =
{
	qrData: undefined,
};

const mapStateToProps = state =>
	({
		token: (state.auth.user && state.auth.twoFactorToken) || '',
		secret: (state.auth.user && state.auth.user.twoFactorSecret) || '',
		qrData: state.auth.twoFactorQrData,
	});

const mapDispatchToProps = dispatch =>
	({
		onChanged2FAToken: event => dispatch(authActions.change2FAToken(event.target.value)),
		createUser: () => dispatch(authActions.createUser()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorCreate);
