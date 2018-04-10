import React from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';

const authActions = AuthActions();

const mapDispatchToProps = dispatch =>
	({
		onClickedButton: password => dispatch(authActions.login(password)),
	});

const Login = props =>
	(
		<div>
			<UserForm {...props} buttonText="Login" />
			<AuthProgress title="Logging in" />
		</div>
	);

export default connect(null, mapDispatchToProps)(Login);
