import React from 'react';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

import WalletDetails from './WalletDetails';
import walletActionTypes from '../modules/wallet/actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('WalletDetails', () =>
{
	let wrapper;
	let store;

	let initialState;

	const walletDetails = () =>
	{
		store = mockStore(initialState);

		if (!wrapper)
		{
			wrapper = shallow(<WalletDetails store={store} />).dive();
		}

		return wrapper;
	};

	beforeEach(() =>
	{
		initialState = {
			wallet:
			{
				amount: 10,
			},
		};

		wrapper = undefined;
	});

	it('renders without crashing', () =>
	{
		expect(walletDetails().exists()).toBe(true);
	});

	it('renders amount properly', () =>
	{
		expect(walletDetails().find('#amountField').props().value).toBe(initialState.wallet.amount);
	});

	it('dispatches amountChanged action correctly', () =>
	{
		const amountField = walletDetails().find('#amountField').first();
		amountField.simulate('change', { target: { value: 20 } });
		expect(store.getActions()[0]).toEqual(
			{
				type: walletActionTypes.CHANGE_AMOUNT,
				amount: 20,
			});
	});
});
