import t from './actionTypes';
import api from './api';
import protocol from './protocol';

function createUser(password)
{
	return (dispatch, getState) =>
	{
		const user = getState().auth.user;

		const progressCallback = (p) =>
		{
			console.log('progress: ' + p);
		};

		protocol.createUser(user, password, progressCallback).then((result) =>
		{
			dispatch({
				type: t.LOG_IN,
				user: result.user
			});

			console.log('created user');
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

function logout()
{
	return {
		type: t.LOG_OUT
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
	logout,
	changeUsername
};
