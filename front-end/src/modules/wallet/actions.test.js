import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import each from 'jest-each';

import t from './actionTypes';
import Actions from './actions';
import walletActionTypes from './actionTypes';
import StubWalletProvider from '../wallet/provider/stubProvider';
import walletErrorMessages from './errorMessages';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('wallet actions', () =>
{
	const initialState =
	{
		wallet:
		{
			secret: {},
		},
	};

	let store;
	let actions;

	beforeEach(() =>
	{
		actions = Actions(StubWalletProvider());

		store = mockStore(initialState);
	});

	it('updates balance properly', () =>
	{
		actions = Actions(StubWalletProvider(false, 100));

		return store.dispatch(actions.updateBalance()).then(() =>
		{
			expect(store.getActions()[0]).toEqual(
				{
					type: walletActionTypes.UPDATE_BALANCE,
					balance: 100,
				});
		});
	});

	it('throws when no secret is supplied when updating', () =>
	{
		store = mockStore({ wallet: {} });

		expect(() => store.dispatch(actions.updateBalance())).toThrow();
	});

	it('throws when no secret is supplied when sending', () =>
	{
		store = mockStore({ wallet: {} });
		expect(() => store.dispatch(actions.performTransaction())).toThrow();
	});

	it('fails transaction when secret, receiver or amount missing', async () =>
	{
		store = mockStore({ wallet: { secret: {}, amount: 10 } });

		await store.dispatch(actions.performTransaction());
		expect(store.getActions()[0]).toEqual(
			{
				type: walletActionTypes.INVALID_RECEIVER_ERROR,
				error: walletErrorMessages.NO_RECEIVER_WHEN_SENDING,
			});

		store = mockStore({ wallet: { secret: {}, receiver: 'test' } });

		await store.dispatch(actions.performTransaction());
		expect(store.getActions()[0]).toEqual(
			{
				type: walletActionTypes.INVALID_AMOUNT_ERROR,
				error: walletErrorMessages.NO_AMOUNT_WHEN_SENDING,
			});
	});

	it('dispatches status updates correctly when performing transaction', async () =>
	{
		store = mockStore({ wallet: { secret: {}, receiver: 'test', amount: 10 } });
		await store.dispatch(actions.performTransaction());

		const storeActions = store.getActions();

		expect(storeActions[0]).toEqual(
			{
				type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
				status:
				{
					isFinished: false,
					errorMessage: null,
				},
			});

		expect(storeActions[1]).toEqual(
			{
				type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
				status:
				{
					isFinished: true,
					errorMessage: null,
				},
			});
	});

	it('updates balance after transaction is finished', async () =>
	{
		store = mockStore({ wallet: { secret: {}, receiver: 'test', amount: 10 } });
		await store.dispatch(actions.performTransaction());

		const storeActions = store.getActions();

		expect(storeActions[storeActions.length - 1].type).toEqual(walletActionTypes.UPDATE_BALANCE);
	});
});
