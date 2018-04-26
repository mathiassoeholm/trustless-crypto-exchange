import React from 'react';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

import WalletDetailsBuilder from './WalletDetails';
import walletActionTypes from '../modules/wallet/actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('WalletDetails', () =>
{
	let wrapper;
	let store;

	let initialState;

	const mockActions =
	{
		performTransaction: () =>
			({
				type: 'TRANSACTION_TEST',
			}),
	};

	const walletDetails = (useMockActions) =>
	{
		store = mockStore(initialState);

		if (!wrapper)
		{
			let WalletDetails = WalletDetailsBuilder();
			let WalletDetailsWithMock = WalletDetailsBuilder(() => mockActions);

			if (useMockActions)
			{
				wrapper = shallow(<WalletDetailsWithMock store={store} />).dive();
			}
			else
			{
				wrapper = shallow(<WalletDetails store={store} />).dive();
			}
		}

		return wrapper;
	};

	beforeEach(() =>
	{
		initialState = {
			wallet:
			{
				amount: 10,
				receiver: '0000',
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

	it('renders receiver properly', () =>
	{
		expect(walletDetails().find('#receiverField').props().value).toBe(initialState.wallet.receiver);
	});

	it('dispatches receiverChanged action correctly', () =>
	{
		const amountField = walletDetails().find('#receiverField').first();
		amountField.simulate('change', { target: { value: '1111' } });
		expect(store.getActions()[0]).toEqual(
			{
				type: walletActionTypes.CHANGE_RECEIVER,
				receiver: '1111',
			});
	});

	it('dispatches performTransaction correctly', () =>
	{
		const submitButton = walletDetails(true).find('#submitButton').first();
		submitButton.simulate('click');

		expect(store.getActions()[0].type).toBe('TRANSACTION_TEST');
	});
});
