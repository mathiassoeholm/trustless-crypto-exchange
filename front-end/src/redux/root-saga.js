import { all } from 'redux-saga/effects';

import walletSaga from '../modules/wallet/saga';

export default function* ()
{
	yield all([
		walletSaga(),
	]);
}
