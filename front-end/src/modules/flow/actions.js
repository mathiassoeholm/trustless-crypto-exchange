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

const setEnable2FA = value =>
	({
		type: t.SET_ENABLE_2FA,
		value,
	});

export default
{
	setEnable2FA,
	changeMenu,
	setSendConfirmationOpen,
};
