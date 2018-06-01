import t from './action-types';

const changeMenu = menuType =>
	({
		type: t.CHANGE_MENU,
		menuType,
	});

export default
{
	changeMenu,
};
