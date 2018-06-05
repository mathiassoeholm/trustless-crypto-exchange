import t from './action-types';
import config from '../../config';
import flowActions from '../flow/actions';

export default (
	authProtocol = config.makeAuthProtocol(),
	walletProvider = config.makeWalletProvider()) =>
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

	const loginAction = (user, secret) =>
		({
			type: t.LOG_IN,
			secret,
			user,
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

	const validateAndGoToMenu = (password, menuType) => (dispatch, getState) =>
	{
		const user = getState().auth && getState().auth.user;

		if (validateInput(user, password, dispatch))
		{
			dispatch(flowActions.changeMenu(menuType));
		}
	}

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

	const change2FAToken = token =>
		({
			type: t.CHANGE_2FA_TOKEN,
			token,
		});

	return {
		validateAndGoToMenu,
		change2FAToken,
		clearPasswordError,
		createUser,
		login,
		logout,
		changeUsername,
	};
};
