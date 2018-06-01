import config from '../../config';
import walletActionTypes from './action-types';
import errorMessages from './error-messages';

export default (walletProvider = config.makeWalletProvider()) =>
{
	const balanceUpdateFailed = error =>
		({
			type: walletActionTypes.BALANCE_UPDATE_FAILED,
			error,
		});

	const updateBalance = () => (dispatch, getState) =>
	{
		const { secret } = getState().wallet;

		if (!secret)
		{
			throw Error(errorMessages.NO_SECRET_WHEN_UPDATING_BALANCE);
		}

		return walletProvider.getBalance(secret)
			.then((balance) =>
			{
				dispatch(
					{
						type: walletActionTypes.UPDATE_BALANCE,
						balance,
					});
			})
			.catch(error => dispatch(balanceUpdateFailed(error.message)));
	};

	const statusUpdate = (isFinished, errorMessage) =>
		({
			type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
			status:
			{
				isFinished,
				errorMessage,
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

	const performTransaction = () => (dispatch, getState) =>
	{
		const { secret, amount, receiver } = getState().wallet;

		if (!secret)
		{
			throw Error(errorMessages.NO_SECRET_WHEN_SENDING);
		}
		else if (!amount)
		{
			dispatch(invalidAmount(errorMessages.NO_AMOUNT_WHEN_SENDING));
			return null;
		}
		else if (!receiver)
		{
			dispatch(invalidReceiver(errorMessages.NO_RECEIVER_WHEN_SENDING));
			return null;
		}

		dispatch(statusUpdate(false, null));

		return walletProvider.sendCurrency(secret, receiver, amount)
			.then(() =>
			{
				dispatch(statusUpdate(true, null));
				return dispatch(updateBalance(secret));
			})
			.catch(error => dispatch(statusUpdate(true, error.message)));
	};

	const changeAmount = amount =>
		({
			type: walletActionTypes.CHANGE_AMOUNT,
			amount,
		});

	const changeReceiver = receiver =>
		({
			type: walletActionTypes.CHANGE_RECEIVER,
			receiver,
		});

	return {
		updateBalance,
		performTransaction,
		changeAmount,
		changeReceiver,
	};
};
