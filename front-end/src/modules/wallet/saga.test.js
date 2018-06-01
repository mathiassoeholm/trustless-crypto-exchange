import { select, call, put } from 'redux-saga/effects';

import makeWalletActions from './actions';
import makeStubWalletProvider from './provider/stub-provider';
import { secretSelector, makeUpdateBalance } from './saga';

describe('wallet saga', () =>
{
	const walletActions = makeWalletActions();

	it('updates balance properly', () =>
	{
		const walletProvider = makeStubWalletProvider();
		const updateBalance = makeUpdateBalance(walletProvider);
		const generator = updateBalance();

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
		const updateBalance = makeUpdateBalance(null);
		const generator = updateBalance();

		expect(generator.next).toThrow();
	});

	it('dispatches error action when updating balance', async () =>
	{
		const updateBalance = makeUpdateBalance(makeStubWalletProvider());
		const generator = updateBalance();

		generator.next();
		generator.next({});
		const putUpdateFailure = generator.throw('error').value;

		expect(putUpdateFailure).toEqual(put(walletActions.balanceUpdateFailed('error')));
	});
});
