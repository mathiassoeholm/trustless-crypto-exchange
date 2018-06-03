import each from 'jest-each';
import deepFreeze from 'deep-freeze';

import flowActionTypes from './action-types';
import authActionTypes from '../auth/action-types';
import menuTypes from './menu-types';
import reducer from './reducer';
import flowActions from './actions';
import walletActions from '../wallet/actions';

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
	const stateBefore = { activeMenu: menuTypes.WALLET };
	const stateAfter = { activeMenu: menuTypes.LOGIN };

	const action =
	{
		type: authActionTypes.LOG_OUT,
	};

	const newState = reducer(stateBefore, action);

	expect(newState).toEqual(stateAfter);
});

each(
	[
		['sendConfirmationOpen', { sendConfirmationOpen: false }, { sendConfirmationOpen: true }, flowActions.setSendConfirmationOpen(true)],
		['menu', { activeMenu: menuTypes.LOGIN }, { activeMenu: menuTypes.WALLET }, flowActions.changeMenu(menuTypes.WALLET)],
		[
			'sendConfirmationOpen when transaction finished',
			{ sendConfirmationOpen: true },
			{ sendConfirmationOpen: false },
			walletActions.statusUpdate(true, null),
		],
	]).it('changes %s and is pure', (_, stateBefore, stateAfter, action) =>
{
	deepFreeze(stateBefore);

	const newState = reducer(stateBefore, action);

	expect(newState).toEqual(stateAfter);
});
