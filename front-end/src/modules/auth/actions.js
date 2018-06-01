import t from './actionTypes';
import config from '../../config';

export default (authProtocol = config.MakeAuthProtocol()) =>
{
	const setUsernameError = errorMessage =>
		({
			type: t.SET_USERNAME_ERROR,
			errorMessage,
		});

	const setPasswordError = errorMessage =>
		({
			type: t.SET_PASSWORD_ERROR,
			errorMessage,
		});

	const clearPasswordError = () =>
		({
			type: t.CLEAR_PASSWORD_ERROR,
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

	const validateInput = (user, password, dispatch) =>
	{
		let didErr = false;

		if (!password)
		{
			dispatch(setPasswordError('Provide a passphrase'));
			didErr = true;
		}

		if (!user || !user.username)
		{
			dispatch(setUsernameError('Provide a username'));
			didErr = true;
		}

		return !didErr;
	};

	const createUser = password => (dispatch, getState) =>
	{
		const user = getState().auth && getState().auth.user;

		if (!validateInput(user, password, dispatch))
		{
			return Promise.resolve(undefined);
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
		const user = getState().auth && getState().auth.user;

		if (!validateInput(user, password, dispatch))
		{
			return Promise.resolve(undefined);
		}

		const { username } = user;

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
		clearPasswordError,
		createUser,
		login,
		logout,
		changeUsername,
	};
};
