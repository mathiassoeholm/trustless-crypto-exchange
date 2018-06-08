import t from './action-types';

const changeMenu = menuType =>
	({
		type: t.CHANGE_MENU,
		menuType,
	});

const setSendDialogOpen = open =>
	({
		type: t.SET_SEND_DIALOG_OPEN,
		open,
	});

const setEnable2FA = value =>
	({
		type: t.SET_ENABLE_2FA,
		value,
	});

const setSendDialogStep = step =>
	({
		type: t.SET_SEND_DIALOG_STEP,
		step,
	});

export default
{
	setEnable2FA,
	changeMenu,
	setSendDialogOpen,
	setSendDialogStep,
};
