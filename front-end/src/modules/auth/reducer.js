import t from './actionTypes';

const exampleState =
{
	loginAttemptStatus:
	{
		progress: 0.9,
		message: "message",
		errorMessage: "error"
	},
	isLoggingIn: false,	
	isLoggedIn: true,
	user:
	{
		username: "bob"
	}
};

let initialState = 
{
	loginAttemptStatus: null,
	isLoggingIn: false,
	isLoggedIn: false, 
	user: null
};

const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
		case t.LOG_IN:
			return { ...state, isLoggedIn: true, user: action.user };

		case t.LOG_OUT:
			return { ...state, isLoggedIn: false, user: null };

		case t.CHANGE_USERNAME:
			return { ...state, user: { ...state.user, username: action.username } };

		case t.PROGRESS_UPDATE:
			return { ...state, isLoggingIn: true, loginAttemptStatus: action.status };

		case t.LOGIN_ATTEMPT_FINISHED:
		{
			let newState = { ...state, isLoggingIn: false };

			if(action.message !== null)
			{
				newState = { ...newState, loginAttemptStatus: { errorMessage: action.errorMessage }};
			}

			return newState;
		}

        default:
            return state;
    }
};

export default reducer;
