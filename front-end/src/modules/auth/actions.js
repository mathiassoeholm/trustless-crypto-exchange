import t from './actionTypes';
import api from './api';
import crypto from 'crypto';
import scrypt from 'scrypt-js';
import buffer from 'buffer';

function createUser(password)
{
	return (dispatch, getState) =>
	{
		const username = getState().auth.user.username;

		// TODO: Investigate normalize
		password = new buffer.SlowBuffer(password.normalize('NFKC'));

		const randomString = crypto.randomBytes(16).toString();
		const salt = new buffer.SlowBuffer(randomString.normalize('NFKC'));

		const N = 1024, r = 8, p = 1;
		const keyLength = 32;

		scrypt(password, salt, N, r, p, keyLength, (error, progress, key) =>
		{
			if (error)
			{
				console.log("Error: " + error);
			}
			else if (key)
			{
				console.log("Found: " + key);

				/*api.createUser(username, "cipher", "testsalt").then(result =>
				{
					const user = result.user;
		
					dispatch(
					{
						type: t.LOG_IN,
						user
					});
				});	*/
			}
			else
			{
				console.log(progress);
			}
		});

		// TODO - Encrypt using generated key and AES
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
