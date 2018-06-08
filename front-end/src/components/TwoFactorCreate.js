import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';
import LoginAttemptError from './LoginAttemptError';
import TwoFactorTokenField from './TwoFactorTokenField';
import QRCode from './QRCode';

const authActions = AuthActions();

const TwoFactorCreate = props =>
	(
		<div>
			<QRCode data={props.qrData} />
			<Typography variant="body1"><b>Secret:</b> {props.secret}</Typography>
			<TwoFactorTokenField />
			<br />
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
	secret: PropTypes.string.isRequired,
	qrData: PropTypes.string,
	createUser: PropTypes.func.isRequired,
};

TwoFactorCreate.defaultProps =
{
	qrData: undefined,
};

const mapStateToProps = state =>
	({
		secret: (state.auth.user && state.auth.user.twoFactorSecret) || '',
		qrData: state.auth.twoFactorQrData,
	});

const mapDispatchToProps = dispatch =>
	({
		createUser: () => dispatch(authActions.createUser()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorCreate);
