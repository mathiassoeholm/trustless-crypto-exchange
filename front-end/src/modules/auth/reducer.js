import t from './actionTypes';

const exampleState =
{
	loginAttemptStatus:
	{
		progress: 0.9,
		message: "message"
	},
	isLoggedIn: true,
	user:
	{
		username: "bob"
	}
};

let initialState = 
{
	loginAttemptStatus: null,
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
			return { ...state, loginAttemptStatus: action.status };

        default:
            return state;
    }
};

export default reducer;
