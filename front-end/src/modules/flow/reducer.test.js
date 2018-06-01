
import deepFreeze from 'deep-freeze';

import flowActionTypes from './action-types';
import authActionTypes from '../auth/action-types';
import menuTypes from './menu-types';
import reducer from './reducer';

it('changes menu to wallet when logging in and is pure', () =>
{
	const stateBefore = { activeMenu: menuTypes.LOGIN };
	const stateAfter = { activeMenu: menuTypes.WALLET };

	const action =
	{
		type: authActionTypes.LOG_IN,
	};

	deepFreeze(stateBefore);

	const newState = reducer(stateBefore, action);

	expect(newState).toEqual(stateAfter);
});

it('changes menu to login after logging out', () =>
{
	const stateAfter = { activeMenu: menuTypes.LOGIN };

	const action =
	{
		type: authActionTypes.LOG_OUT,
	};

	const newState = reducer(undefined, action);

	expect(newState).toEqual(stateAfter);
});

it('changes menu correctly', () =>
{
	const stateAfter = { activeMenu: menuTypes.WALLET };

	const action =
	{
		type: flowActionTypes.CHANGE_MENU,
		menuType: menuTypes.WALLET,
	};

	const newState = reducer(undefined, action);

	expect(newState).toEqual(stateAfter);
});
