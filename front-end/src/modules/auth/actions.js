import t from './actionTypes';
import api from './api';

function createUser(password)
{
	return (dispatch, getState) =>
	{
		const username = getState().auth.user.username;

		// TODO - Generate salt
		// TODO - Generate encryption key using scrypt and salt
		// TODO - Encrypt using generated key and AES
		api.createUser(username, "cipher", "testsalt").then(result =>
		{
			const user = result.user;

			dispatch(
			{
				type: t.LOG_IN,
				user
			});
		});	
	};
}

function login(password)
{
	return (dispatch, getState) =>
	{
		const username = getState().auth.user.username;

		api.getWallet().then(result =>
		{
			dispatch(
			{
				type: t.LOG_IN,
				user: 
				{
					username
				}	
			});
		});
	};
}

function changeUsername(username)
{
	return (dispatch) =>
	{
		dispatch(
		{
			type: t.CHANGE_USERNAME,
			username
		});
	};
}

export default
{
	createUser,
	login,
	changeUsername
};
