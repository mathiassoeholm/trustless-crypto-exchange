import React from 'react';
import UserForm from './UserForm';
import authActions from '../modules/auth/actions';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) =>
({
	onClickedButton: (password) => dispatch(authActions.login(password))
});

let Login = (props) =>
{
	return (
		<UserForm {...props} buttonText="Login"/>
	);
}

Login = connect(null, mapDispatchToProps)(Login);

export default Login;
