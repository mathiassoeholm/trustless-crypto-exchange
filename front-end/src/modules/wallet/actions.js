import walletActionTypes from './action-types';

const balanceUpdateFailed = error =>
	({
		type: walletActionTypes.BALANCE_UPDATE_FAILED,
		error,
	});

const startBalanceUpdate = () =>
	({
		type: walletActionTypes.START_BALANCE_UPDATE,
	});

const updateBalance = balance =>
	({
		type: walletActionTypes.UPDATE_BALANCE,
		balance,
	});

const statusUpdate = (isFinished, error) =>
	({
		type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
		status:
		{
			isFinished,
			error,
		},
	});

const invalidAmount = error =>
	({
		type: walletActionTypes.INVALID_AMOUNT_ERROR,
		error,
	});

const invalidReceiver = error =>
	({
		type: walletActionTypes.INVALID_RECEIVER_ERROR,
		error,
	});

const transactionSuccess = () =>
	({
		type: walletActionTypes.TRANSACTION_SUCCESS,
	});

const startTransaction = () =>
	({
		type: walletActionTypes.START_TRANSACTION,
	});

const changeAmount = amount =>
	({
		type: walletActionTypes.CHANGE_AMOUNT,
		amount: Number(amount),
	});

const changeReceiver = receiver =>
	({
		type: walletActionTypes.CHANGE_RECEIVER,
		receiver,
	});

const updateTransactions = transactions =>
	({
		type: walletActionTypes.UPDATE_TRANSACTIONS,
		transactions,
	});

export default {
	startTransaction,
	changeAmount,
	changeReceiver,
	balanceUpdateFailed,
	updateBalance,
	invalidAmount,
	invalidReceiver,
	statusUpdate,
	transactionSuccess,
	startBalanceUpdate,
	updateTransactions,
};
