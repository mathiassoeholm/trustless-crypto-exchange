import t from './action-types';

const changeMenu = menuType =>
	({
		type: t.CHANGE_MENU,
		menuType,
	});

const setSendConfirmationOpen = open =>
	({
		type: t.SET_SEND_CONFIRMATION_OPEN,
		open,
	});

export default
{
	changeMenu,
	setSendConfirmationOpen,
};
