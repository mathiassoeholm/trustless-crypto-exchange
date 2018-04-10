import t from './actionTypes';

const changeMenu = menuType =>
	({
		type: t.CHANGE_MENU,
		menuType,
	});

export default
{
	changeMenu,
};
