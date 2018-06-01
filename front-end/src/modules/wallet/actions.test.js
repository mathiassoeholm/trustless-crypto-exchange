import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import makeActions from './actions';
import walletActionTypes from './action-types';
import makeStubWalletProvider from '../wallet/provider/stub-provider';
import walletErrorMessages from './error-messages';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('wallet actions', () =>
{
	const initialState =
	{
		wallet:
		{
			secret: {},
			amount: 10,
			receiver: 'test',
		},
	};

	let store;
	let actions;

	const lastActionFromStore = () => store.getActions()[store.getActions().length - 1];
	const firstActionFromStore = () => store.getActions()[0];

	beforeEach(() =>
	{
		actions = makeActions(makeStubWalletProvider());

		store = mockStore(initialState);
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
		expect(firstActionFromStore()).toEqual(
			{
				type: walletActionTypes.INVALID_RECEIVER_ERROR,
				error: walletErrorMessages.NO_RECEIVER_WHEN_SENDING,
			});

		store = mockStore({ wallet: { secret: {}, receiver: 'test' } });

		await store.dispatch(actions.performTransaction());
		expect(firstActionFromStore()).toEqual(
			{
				type: walletActionTypes.INVALID_AMOUNT_ERROR,
				error: walletErrorMessages.NO_AMOUNT_WHEN_SENDING,
			});
	});

	it('dispatches status updates correctly when performing transaction', async () =>
	{
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

	it('dispatches error action when performing transaction', async () =>
	{
		actions = makeActions(makeStubWalletProvider(true));
		await store.dispatch(actions.performTransaction());

		expect(lastActionFromStore()).toEqual(
			{
				type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
				status:
				{
					isFinished: true,
					errorMessage: 'error',
				},
			});
	});
});
