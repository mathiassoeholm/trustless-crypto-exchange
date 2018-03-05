import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import UserForm from './UserForm';

const Create = props =>
{
	const onClickedCreate = password =>
	{
		// TODO - Generate salt
		// TODO - Generate encryption key using scrypt and salt
		// TODO - Encrypt using generated key and AES
		api.createUser(props.appState.username, "cipher", "testsalt");
	};

	return (
		<UserForm appState={props.appState} appHandlers={props.appHandlers} onClickedButton={onClickedCreate} buttonText="Create"/>
	);
}

Create.propTypes =
{
	appHandlers: PropTypes.object.isRequired,
	appState: PropTypes.object.isRequired
};

export default Create;
