import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';

const authActions = AuthActions();

const TwoFactorCreate = props =>
	(
		<div>
			<TextField
				id="2fatoken"
				label="2FA Token"
				value={props.token}
				onChange={props.onChanged2FAToken}
				margin="normal"
			/>
			<AuthProgress title="Creating user" />
		</div>
	);

TwoFactorCreate.propTypes =
{
	token: PropTypes.string.isRequired,
	onChanged2FAToken: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		token: state.auth.user ? state.auth.user.twoFactorToken : '',
	});

const mapDispatchToProps = dispatch =>
	({
		onChanged2FAToken: event => dispatch(authActions.change2FAToken(event.target.value)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorCreate);
