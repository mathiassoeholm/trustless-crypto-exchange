import t from './actionTypes';

let initialState = { isLoggedIn: false, user: null };

const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
		case t.LOG_IN:
			return Object.assign({}, state, { isLoggedIn: true, user: action.user });

        case t.LOG_OUT:
			return Object.assign({}, state, { isLoggedIn: false, user: null });

		case t.CHANGE_USERNAME:
		{
			const user = Object.assign({}, state.user, { username: action.username });
			return Object.assign({}, state, { user });
		}

        default:
            return state;
    }
};

export default reducer;
