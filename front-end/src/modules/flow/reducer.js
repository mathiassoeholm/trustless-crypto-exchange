import t from './action-types';
import authActionTypes from '../auth/action-types';
import menuTypes from './menu-types';

const initialState = { activeMenu: menuTypes.LOGIN };

const changeMenu = (state, newMenu) => ({ ...state, activeMenu: newMenu });

const reducer = (state = initialState, action) =>
{
	switch (action.type)
	{
	case authActionTypes.LOG_IN:
		// TODO - Change to correct menu after logging in
		return changeMenu(state, menuTypes.WALLET);

	case authActionTypes.LOG_OUT:
		return changeMenu(state, menuTypes.LOGIN);

	case t.CHANGE_MENU:
		return changeMenu(state, action.menuType);

	default:
		return state;
	}
};

export default reducer;
