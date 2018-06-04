import { all, put, call, select, takeLatest } from 'redux-saga/effects';

import authActionTypes from '../auth/action-types';
import walletActionTypes from './action-types';

import config from '../../config';
import errorMessages from './error-messages';
import walletActions from './actions';

export const secretSelector = ({ wallet }) => wallet.secret;

export const makeUpdateBalance = (walletProvider = config.makeWalletProvider()) =>
	function* updateBalance()
	{
		const secret = yield select(secretSelector);

		if (!secret)
		{
			throw Error(errorMessages.NO_SECRET_WHEN_UPDATING_BALANCE);
		}

		try
		{
			const balance = yield call(walletProvider.getBalance, secret);
			yield put(walletActions.updateBalance(balance));
		}
		catch (error)
		{
			yield put(walletActions.balanceUpdateFailed(error));
		}
	};

export const walletSelector = state => state.wallet;

export const makePerformTransaction = (walletProvider = config.makeWalletProvider()) =>
	function* performTransaction()
	{
		const { secret, amount, receiver } = yield select(walletSelector);

		if (secret === undefined)
		{
			throw Error(errorMessages.NO_SECRET_WHEN_UPDATING_BALANCE);
		}
		else if (amount === undefined)
		{
			yield put(walletActions.invalidAmount(errorMessages.NO_AMOUNT_WHEN_SENDING));
		}
		else if (receiver === undefined)
		{
			yield put(walletActions.invalidReceiver(errorMessages.NO_RECEIVER_WHEN_SENDING));
		}

		yield put(walletActions.statusUpdate(false, null));

		try
		{
			yield call(walletProvider.sendCurrency, secret, receiver, amount);

			yield put(walletActions.statusUpdate(true, null));
			yield put(walletActions.transactionSuccess());
		}
		catch (error)
		{
			yield put(walletActions.statusUpdate(true, error));
		}
	};

export default function* ()
{
	yield all([
		takeLatest(
			[
				authActionTypes.LOG_IN,
				walletActionTypes.TRANSACTION_SUCCESS,
			], makeUpdateBalance()),

		takeLatest(walletActionTypes.START_TRANSACTION, makePerformTransaction()),
	]);
}
