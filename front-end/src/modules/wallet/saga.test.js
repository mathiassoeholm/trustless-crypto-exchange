import { select, call, put } from 'redux-saga/effects';

import walletActions from './actions';
import errorMessages from './error-messages';
import makeStubWalletProvider from './provider/stub-provider';
import {
	secretSelector,
	makeUpdateBalance,
	walletSelector,
	makePerformTransaction,
	makeUpdateTransactions,
	addressSelector,
} from './saga';

describe('wallet saga', () =>
{
	describe('update balance', () =>
	{
		let walletProvider;
		let generator;

		beforeEach(() =>
		{
			walletProvider = makeStubWalletProvider();
			generator = makeUpdateBalance(walletProvider)();
		});


		it('updates balance properly', () =>
		{
			const selectSecret = generator.next().value;
			expect(selectSecret).toEqual(select(secretSelector));

			const secret = { address: 'test' };
			const callGetBalance = generator.next(secret).value;
			expect(callGetBalance).toEqual(call(walletProvider.getBalance, secret));

			const balance = 100;
			const putUpdateBalance = generator.next(balance).value;
			expect(putUpdateBalance).toEqual(put(walletActions.updateBalance(balance)));
		});

		it('throws when no secret is supplied when updating', () =>
		{
			generator.next();
			expect(() => generator.next()).toThrow(Error);
		});

		it('dispatches error action when updating balance', () =>
		{
			generator.next();
			generator.next({});
			const putUpdateFailure = generator.throw('error').value;

			expect(putUpdateFailure).toEqual(put(walletActions.balanceUpdateFailed('error')));
		});
	});

	describe('perform transaction', () =>
	{
		let walletProvider;
		let generator;
		let walletApi;

		beforeEach(() =>
		{
			walletApi =
			{
				addTransaction: () => { },
			};

			walletProvider = makeStubWalletProvider();
			generator = makePerformTransaction(walletProvider, walletApi)();
		});

		it('throws when secret missing', () =>
		{
			generator.next();
			expect(() => generator.next()).toThrow(Error);
		});

		it('fails when amount missing', () =>
		{
			generator.next();
			expect(generator.next({ secret: {}, receiver: 'test' }).value)
				.toEqual(put(walletActions.invalidAmount(errorMessages.NO_AMOUNT_WHEN_SENDING)));
		});

		it('fails when receiver missing', () =>
		{
			// Test if it works when amount is missing
			generator.next();
			expect(generator.next({ secret: {}, amount: 100 }).value)
				.toEqual(put(walletActions.invalidReceiver(errorMessages.NO_RECEIVER_WHEN_SENDING)));
		});

		it('yields correctly when transaction succeeds', () =>
		{
			expect(generator.next().value).toEqual(select(walletSelector));

			const state =
			{
				address: 'address',
				secret: {},
				amount: 100,
				receiver: 'test',
			};

			expect(generator.next(state).value)
				.toEqual(put(walletActions.statusUpdate(false, null)));

			expect(generator.next().value)
				.toEqual(
					call(walletProvider.sendCurrency, state.secret, state.receiver, state.amount));

			expect(generator.next().value)
				.toEqual(call(walletApi.addTransaction, state.address, state.receiver, state.amount));

			expect(generator.next().value)
				.toEqual(put(walletActions.statusUpdate(true, null)));

			expect(generator.next().value)
				.toEqual(put(walletActions.transactionSuccess()));
		});

		it('yields correctly when transaction fails', () =>
		{
			// Wallet selector
			generator.next();

			// Initial statusupdate
			generator.next({ secret: {}, amount: 100, receiver: 'test' });

			// Call to sendCurrency
			generator.next();

			expect(generator.throw('error').value)
				.toEqual(put(walletActions.statusUpdate(true, 'error')));
		});
	});

	describe('update transactions', () =>
	{
		let generator;
		let walletApi;

		beforeEach(() =>
		{
			walletApi =
			{
				getTransactions: () => { },
			};

			generator = makeUpdateTransactions(walletApi)();
		});

		it('yields correctly', () =>
		{
			expect(generator.next().value)
				.toEqual(select(addressSelector));

			const address = 'address';
			expect(generator.next(address).value)
				.toEqual(call(walletApi.getTransactions, address));

			const transactions = [{ from: 'from', to: 'to', amount: 10 }];
			expect(generator.next(transactions).value)
				.toEqual(put(walletActions.updateTransactions(transactions)));
		});
	});
});
