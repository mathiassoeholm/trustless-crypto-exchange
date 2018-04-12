import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import each from 'jest-each';

import t from './actionTypes';
import Actions from './actions';
import walletActionTypes from './actionTypes';
import stubWalletProvider from '../wallet/provider/stubProvider';

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
		actions = Actions(stubWalletProvider);

		store = mockStore(initialState);
	});

	it('updates balance properly', () =>
	{
		stubWalletProvider.setBalance(100);

		return store.dispatch(actions.updateBalance()).then(() =>
		{
			expect(store.getActions()[0]).toEqual(
				{
					type: walletActionTypes.UPDATE_BALANCE, 
					balance: 100,
				});
		});
	});
});
