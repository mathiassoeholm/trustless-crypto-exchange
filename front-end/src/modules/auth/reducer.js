import t from './actionTypes';
import utils from '../../utils';

let initialState = { isLoggedIn: false, user: null };

const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
		case t.LOG_IN:
		{
			const deepUserCopy = utils.deepCopy(action.user);
			return Object.assign({}, state, { isLoggedIn: true, user: deepUserCopy });
		}

		case t.LOG_OUT:
		{
			return Object.assign({}, state, { isLoggedIn: false, user: null });
		}

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
