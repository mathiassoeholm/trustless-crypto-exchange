import t from './actionTypes';
import config from '../../config';

export default (
	authProtocol = config.MakeAuthProtocol(),
	walletProvider = config.WalletProvider()) =>
{
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

	const loginAction = (user, secret) =>
		({
			type: t.LOG_IN,
			secret,
			user,
		});

	const createUser = password => (dispatch, getState) =>
	{
		const { user } = getState().auth;

		const progressCallback = (p, m) =>
		{
			dispatch(progressUpdate(p, m));
		};

		let secret;

		progressCallback(0, 'Generating Wallet');

		return walletProvider.generateSecret()
			.then((s) =>
			{
				secret = s;
				return authProtocol.createUser(user, password, secret, progressCallback);
			})
			.then((result) =>
			{
				dispatch(loginAttemptFinished());

				dispatch(loginAction(result.user, secret));
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
			.then((secret) =>
			{
				dispatch(loginAttemptFinished());

				dispatch(loginAction({ username	}, secret));
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
