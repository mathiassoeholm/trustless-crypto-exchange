import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import AuthActions from '../modules/auth/actions';

const authActions = AuthActions();

const TwoFactorTokenField = props =>
	(
		<TextField
			id="2fatoken"
			label="2FA Token"
			value={props.token}
			onChange={props.onChanged2FAToken}
			margin="normal"
		/>
	);

TwoFactorTokenField.propTypes =
{
	token: PropTypes.string.isRequired,
	onChanged2FAToken: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		token: (state.auth.user && state.auth.twoFactorToken) || '',
	});

const mapDispatchToProps = dispatch =>
	({
		onChanged2FAToken: event => dispatch(authActions.change2FAToken(event.target.value)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorTokenField);
