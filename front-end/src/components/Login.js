import React from 'react';
import UserForm from './UserForm';
import authActions from '../modules/auth/actions';
import { connect } from 'react-redux';
import AuthProgress from './AuthProgress';

const mapDispatchToProps = (dispatch) =>
({
	onClickedButton: (password) => dispatch(authActions.login(password))
});

let Login = (props) =>
{
	return (
		<div>
			<UserForm {...props} buttonText="Login"/>
			<AuthProgress title="Logging in"/>
		</div>
	);
};

Login = connect(null, mapDispatchToProps)(Login);

export default Login;
