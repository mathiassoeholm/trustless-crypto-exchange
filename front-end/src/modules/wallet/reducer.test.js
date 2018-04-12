import deepFreeze from 'deep-freeze';

import authActionTypes from '../auth/actionTypes';
import walletActionTypes from './actionTypes';
import reducer from './reducer';

describe('Transaction Reducer', () =>
{
	it('saves secret when logging in', () =>
	{
		const secret =
		{
			key: 'bob',
		};

		const action =
		{
			type: authActionTypes.LOG_IN,
			secret,
		};

		const stateAfter = reducer(undefined, action);

		expect(stateAfter.secret.key).toBe(secret.key);
	});

	it('removes secret when logging out and is pure', () =>
	{
		const stateBefore =
		{
			secret:
			{
				key: 'bob',
			},
		};

		deepFreeze(stateBefore);

		const stateAfter = reducer(undefined, { type: authActionTypes.LOG_OUT });

		expect(stateAfter.secret).toBeNull();
	});

	it('update balance and is pure', () =>
	{
		const stateBefore =
		{
			balance: 50,
		};

		deepFreeze(stateBefore);

		const stateAfter = reducer(undefined, { type: walletActionTypes.UPDATE_BALANCE, balance: 100 });

		expect(stateAfter.balance).toBe(100);
	});
});
