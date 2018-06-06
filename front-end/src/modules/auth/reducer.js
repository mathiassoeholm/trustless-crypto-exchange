import t from './action-types';
import flowActionTypes from '../flow/action-types';

const exampleState = // eslint-disable-line no-unused-vars
{
	loginAttemptStatus:
	{
		progress: 0.9,
		message: 'message',
		errorMessage: 'error',
	},
	usernameError: 'Please provide a username',
	passwordError: 'Please provide a password',
	isLoggingIn: false,
	isLoggedIn: true,
	user:
	{
		username: 'bob',
	},
	twoFactorToken: '123456',
	password: 'myPassword',
};

const initialState =
{
	loginAttemptStatus: null,
	isLoggingIn: false,
	isLoggedIn: false,
	user: null,
};

const reducer = (state = initialState, action) =>
{
	switch (action.type)
	{
	case t.LOG_IN:
		return {
			...state,
			isLoggedIn: true,
			user: action.user,

			// Clear password to keep it in memory as short a time as possible
			password: undefined,
		};

	case t.LOG_OUT:
		return { ...state, isLoggedIn: false, user: null };

	case t.CHANGE_USERNAME:
		return {
			...state,
			user: { ...state.user, username: action.username },
			usernameError: undefined,
		};

	case t.CHANGE_PASSWORD:
		return { ...state, password: action.value, passwordError: undefined };

	case t.CHANGE_2FA_TOKEN:
		return {
			...state,
			twoFactorToken: action.token,
		};

	case t.SET_2FA_SECRET:
		return {
			...state,
			user: { ...state.user, twoFactorSecret: action.value.base32 },
			twoFactorQrData: action.value.otpauth_url,
		};

	case t.PROGRESS_UPDATE:
		return { ...state, isLoggingIn: true, loginAttemptStatus: action.status };

	case t.SET_USERNAME_ERROR:
		return { ...state, usernameError: action.errorMessage };

	case t.SET_PASSWORD_ERROR:
		return { ...state, passwordError: action.errorMessage };

	case t.LOGIN_ATTEMPT_FINISHED:
	{
		let newState = { ...state, isLoggingIn: false };

		if (action.message !== null)
		{
			newState = { ...newState, loginAttemptStatus: { errorMessage: action.errorMessage } };
		}

		return newState;
	}

	case flowActionTypes.CHANGE_MENU:
		return { ...state, loginAttemptStatus: { ...state.loginAttemptStatus, errorMessage: null } };

	default:
		return state;
	}
};

export default reducer;
