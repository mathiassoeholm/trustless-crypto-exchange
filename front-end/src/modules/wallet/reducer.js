import authActionTypes from '../auth/actionTypes';
import walletActionTypes from './actionTypes';

const initialState =
{
	transactionStatus: null,
	secret: null,
	balance: null,
	amount: null,
	receiver: null,
};

const reducer = (state = initialState, action) =>
{
	switch (action.type)
	{
	case authActionTypes.LOG_IN:
		return { ...state, secret: action.secret };
	case authActionTypes.LOG_OUT:
		return { ...state, secret: null };
	case walletActionTypes.UPDATE_BALANCE:
		return { ...state, balance: action.balance };
	case walletActionTypes.TRANSACTION_STATUS_UPDATE:
		return { ...state, transactionStatus: action.status };
	case walletActionTypes.CHANGE_AMOUNT:
		return { ...state, amount: action.amount };
	case walletActionTypes.CHANGE_RECEIVER:
		return { ...state, receiver: action.receiver };
	default:
		return state;
	}
};

export default reducer;
