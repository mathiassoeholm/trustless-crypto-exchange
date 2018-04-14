import config from '../../config';
import walletActionTypes from './actionTypes';

export default (walletProvider = config.walletProvider) =>
{
	const updateBalance = () => (dispatch, getState) =>
	{
		const { secret } = getState().wallet;

		if (!secret)
		{
			throw Error('Cannot get balance if there is no secret');
		}

		return walletProvider.getBalance()
			.then((balance) =>
			{
				dispatch(
					{
						type: walletActionTypes.UPDATE_BALANCE,
						balance,
					});
			});
	};

	const statusUpdate = (receiver, amount, message) =>
		({
			receiver,
			amount,
			message,
		});

	const performTransaction = () => (dispatch, getState) =>
	{
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
