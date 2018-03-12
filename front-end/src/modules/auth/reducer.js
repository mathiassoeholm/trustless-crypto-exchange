import t from './actionTypes';

let initialState = { isLoggedIn: false, user: null };

const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
		case t.LOG_IN:
		{
			return { ...state, isLoggedIn: true, user: action.user };
		}

		case t.LOG_OUT:
		{
			return { ...state, isLoggedIn:false, user: null };
		}

		case t.CHANGE_USERNAME:
		{
			return { ...state, user: { ...state.user, username: action.username } };
		}

        default:
            return state;
    }
};

export default reducer;
