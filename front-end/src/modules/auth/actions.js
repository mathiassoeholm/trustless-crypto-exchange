import t from './actionTypes';
import config from '../../config';

export default (authProtocol = config.MakeAuthProtocol()) =>
{
	const setUsernameError = error =>
		({
			type: t.SET_USERNAME_ERROR,
			error,
		});

	const progressUpdate = (progress, message) =>
		({
			type: t.PROGRESS_UPDATE,
			status:
			{
				progress,
				message,
			},
		});

	const loginAttemptFinished = (errorMessage = undefined) =>
		({
			type: t.LOGIN_ATTEMPT_FINISHED,
			errorMessage,
		});

	const createUser = password => (dispatch, getState) =>
	{
		const user = getState().auth && getState().auth.user;

		if (!user)
		{
			return Promise.resolve(
				dispatch(setUsernameError(new Error('Please provide a username')))
			);
		}

		const progressCallback = (p, m) =>
		{
			dispatch(progressUpdate(p, m));
		};

		const secret =
		{
			user:
			{
				username: user.username,
			},
		};

		return authProtocol.createUser(user, password, secret, progressCallback)
			.then((result) =>
			{
				dispatch(loginAttemptFinished());

				dispatch(
					{
						type: t.LOG_IN,
						user: result.user,
					});
			})
			.catch((error) =>
			{
				dispatch(loginAttemptFinished(error.message));
			});
	};

	const login = password => (dispatch, getState) =>
	{
		const { username } = getState().auth.user;

		const progressCallback = (p, m) =>
		{
			dispatch(progressUpdate(p, m));
		};

		return authProtocol.login(username, password, progressCallback)
			.then(() =>
			{
				dispatch(loginAttemptFinished());

				dispatch(
					{
						type: t.LOG_IN,
						user:
						{
							username,
						},
					});
			})
			.catch((error) =>
			{
				dispatch(loginAttemptFinished(error.message));
			});
	};

	const logout = () =>
		({
			type: t.LOG_OUT,
		});

	const changeUsername = username =>
		({
			type: t.CHANGE_USERNAME,
			username,
		});

	return {
		createUser,
		login,
		logout,
		changeUsername,
	};
};
