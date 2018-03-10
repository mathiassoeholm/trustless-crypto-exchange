import t from './actionTypes';
import authActionTypes from '../auth/actionTypes';
import menuTypes from './menuTypes';

let initialState = { activeMenu: menuTypes.LOGIN };

const changeMenu = (state, newMenu) =>
{
	return Object.assign({}, state, { activeMenu: newMenu });
};

const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
		case authActionTypes.LOG_IN:
			// TODO - Change to correct menu after logging in
			return changeMenu(state, menuTypes.LOGIN);

		case authActionTypes.LOG_OUT:
			return changeMenu(state, menuTypes.LOGIN);

		case t.CHANGE_MENU:
			return changeMenu(state, action.menuType);

        default:
            return state;
    }
};

export default reducer;
