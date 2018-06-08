import flowActionTypes from './action-types';
import authActionTypes from '../auth/action-types';
import menuTypes from './menu-types';

const initialState =
{
	activeMenu: menuTypes.LOGIN,
	sendDialogOpen: false,
	sendDialogStep: 0,
	enable2FA: false,
};

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

	case flowActionTypes.CHANGE_MENU:
		return changeMenu(state, action.menuType);

	case flowActionTypes.SET_SEND_DIALOG_OPEN:
		return { ...state, sendDialogOpen: action.open, sendDialogStep: 0 };

	case flowActionTypes.SET_SEND_DIALOG_STEP:
		return { ...state, sendDialogStep: action.step };

	case flowActionTypes.SET_ENABLE_2FA:
		return { ...state, enable2FA: action.value };

	default:
		return state;
	}
};

export default reducer;
