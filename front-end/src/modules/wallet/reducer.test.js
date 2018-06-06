import deepFreeze from 'deep-freeze';
import each from 'jest-each';

import authActionTypes from '../auth/action-types';
import walletActionTypes from './action-types';
import walletActions from './actions';
import reducer from './reducer';
import flowActions from '../flow/actions';

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

		const stateAfter = reducer(stateBefore, { type: authActionTypes.LOG_OUT });

		expect(stateAfter.secret).toBeNull();
	});

	each(
		[
			['isUpdatingBalance', { isUpdatingBalance: false }, { isUpdatingBalance: true }, walletActions.startBalanceUpdate()],
			[
				'balance',
				{ balance: 50, isUpdatingBalance: true },
				{ balance: 100, isUpdatingBalance: false },
				{ type: walletActionTypes.UPDATE_BALANCE, balance: 100 }
			],
			['transaction status',
				{ transactionStatus: null },
				{
					transactionStatus:
					{
						isFinished: false,
						error: null,
					},
				},
				{
					type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
					status:
					{
						isFinished: false,
						error: null,
					},
				},
			],
			['amount', { amount: 25 }, { amount: 50 }, { type: walletActionTypes.CHANGE_AMOUNT, amount: 50 }],
			['receiver', { receiver: null }, { receiver: '1010' }, { type: walletActionTypes.CHANGE_RECEIVER, receiver: '1010' }],
			['balance update error',
				{ balanceUpdateError: null, isUpdatingBalance: true },
				{ balanceUpdateError: 'error', isUpdatingBalance: false },
				{ type: walletActionTypes.BALANCE_UPDATE_FAILED, error: 'error' },
			],
			['amountError', { amountError: 'test' }, { amountError: 'error' }, { type: walletActionTypes.INVALID_AMOUNT_ERROR, error: 'error' }],
			['receiverError', { receiverError: 'test' }, { receiverError: 'error' }, { type: walletActionTypes.INVALID_RECEIVER_ERROR, error: 'error' }],
			[
				'transactionStatus when closing confirmation',
				{ transactionStatus: {} },
				{ transactionStatus: null },
				flowActions.setSendDialogOpen(false),
			],
			[
				'transactions',
				{ transactions: null },
				{ transactions: [{ from: 'from', to: 'to', amount: 10 }] },
				walletActions.updateTransactions([{ from: 'from', to: 'to', amount: 10 }]),
			],
		]).it('changes %s and is pure', (_, stateBefore, stateAfter, action) =>
	{
		deepFreeze(stateBefore);

		const newState = reducer(stateBefore, action);

		expect(newState).toEqual(stateAfter);
	});
});
