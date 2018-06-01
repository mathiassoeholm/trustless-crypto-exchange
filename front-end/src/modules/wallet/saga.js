import { all, put, call, select, takeLatest } from 'redux-saga/effects';

import authActionTypes from '../auth/action-types';
import walletActionTypes from './action-types';

import config from '../../config';
import errorMessages from './error-messages';
import makeWalletActions from './actions';

const walletActions = makeWalletActions();

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

export default function* ()
{
	yield all([
		takeLatest(
			[
				authActionTypes.LOG_IN,
				walletActionTypes.TRANSACTION_FINISHED,
			], makeUpdateBalance()),
	]);
}
