import React from 'react';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

import SendCurrencyBuilder from './SendCurrency';
import walletActionTypes from '../../modules/wallet/action-types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SendCurrency', () =>
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

	const sendCurrency = (useMockActions) =>
	{
		store = mockStore(initialState);

		if (!wrapper)
		{
			const SendCurrency = SendCurrencyBuilder();
			const SendCurrencyWithMock = SendCurrencyBuilder(() => mockActions);

			if (useMockActions)
			{
				wrapper = shallow(<SendCurrencyWithMock store={store} />).dive();
			}
			else
			{
				wrapper = shallow(<SendCurrency store={store} />).dive();
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
		expect(sendCurrency().exists()).toBe(true);
	});

	it('renders amount properly', () =>
	{
		expect(sendCurrency().find('#amountField').props().value).toBe(initialState.wallet.amount);
	});

	it('dispatches amountChanged action correctly', () =>
	{
		const amountField = sendCurrency().find('#amountField').first();
		amountField.simulate('change', { target: { value: 20 } });
		expect(store.getActions()[0]).toEqual(
			{
				type: walletActionTypes.CHANGE_AMOUNT,
				amount: 20,
			});
	});

	it('renders receiver properly', () =>
	{
		expect(sendCurrency().find('#receiverField').props().value).toBe(initialState.wallet.receiver);
	});

	it('dispatches receiverChanged action correctly', () =>
	{
		const amountField = sendCurrency().find('#receiverField').first();
		amountField.simulate('change', { target: { value: '1111' } });
		expect(store.getActions()[0]).toEqual(
			{
				type: walletActionTypes.CHANGE_RECEIVER,
				receiver: '1111',
			});
	});

	it('dispatches performTransaction correctly', () =>
	{
		const submitButton = sendCurrency(true).find('#submitButton').first();
		submitButton.simulate('click');

		expect(store.getActions()[0].type).toBe('TRANSACTION_TEST');
	});
});
