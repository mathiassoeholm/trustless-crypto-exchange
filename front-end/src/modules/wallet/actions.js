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

	return {
		updateBalance,
	};
};
