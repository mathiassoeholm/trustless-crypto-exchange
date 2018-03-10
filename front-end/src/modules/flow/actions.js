import t from './actionTypes';

const changeMenu = (menuType) =>
{
	return {
		type: t.CHANGE_MENU,
		menuType
	};
};

export default
{
	changeMenu
};
