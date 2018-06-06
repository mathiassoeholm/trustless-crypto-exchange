import React from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import TwoFactorTokenField from './TwoFactorTokenField';
import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';

const authActions = AuthActions();

const mapDispatchToProps = dispatch =>
	({
		onClickedButton: () => dispatch(authActions.login()),
	});

const Login = props =>
	(
		<div>
			<UserForm {...props} buttonText="Login" >
				<TwoFactorTokenField />
			</UserForm>
			<AuthProgress title="Logging in" />
		</div>
	);

export default connect(null, mapDispatchToProps)(Login);
