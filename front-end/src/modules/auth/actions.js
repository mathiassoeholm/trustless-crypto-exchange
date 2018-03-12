import t from './actionTypes';
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

		protocol.createUser(user, password, progressCallback)
		.then((result) =>
		{
			dispatch(
			{
				type: t.LOG_IN,
				user: result.user
			});

			console.log('created user');
		})
		.catch((error) =>
		{
			console.log('error: ' + error);
		});
	};
}

function login(password)
{
	return (dispatch, getState) =>
	{
		const username = getState().auth.user.username;

		const progressCallback = (p) =>
		{
			console.log('progress: ' + p);
		};

		protocol.login(username, password, progressCallback)
		.then((result) =>
		{
			dispatch(
			{
				type: t.LOG_IN,
				user: 
				{
					username
				}
			});
		})
		.catch((error) =>
		{
			console.log('error: ' + error);
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
