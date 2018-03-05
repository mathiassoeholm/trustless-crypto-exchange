import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import UserForm from './UserForm';

const Login = props =>
{
	const onClickedLogin = password =>
	{
		api.getWallet(props.appState.username).then(response =>
		{
			// TODO - Generate Encryption key using password and salt
			// TODO - Decrypt keys
			// TODO - Store keys	
		
			console.log("Got user: " + response.cipher + " | " + response.salt);
		});
	};

	return (
		<UserForm appState={props.appState} appHandlers={props.appHandlers} onClickedButton={onClickedLogin} buttonText="Login"/>
	);
}

Login.propTypes =
{
	appHandlers: PropTypes.object.isRequired,
	appState: PropTypes.object.isRequired
};

export default Login;
