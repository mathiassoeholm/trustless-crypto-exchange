import authActionTypes from '../auth/action-types';
import walletActionTypes from './action-types';
import flowActionTypes from '../flow/action-types';

const initialState =
{
	transactionStatus: null,
	balanceUpdateError: null,
	secret: null,
	balance: null,
	amount: 0,
	amountError: null,
	receiver: null,
	receiverError: null,
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
	case walletActionTypes.BALANCE_UPDATE_FAILED:
		return { ...state, balanceUpdateError: action.error };
	case walletActionTypes.TRANSACTION_STATUS_UPDATE:
		return { ...state, transactionStatus: action.status };
	case walletActionTypes.CHANGE_AMOUNT:
		return { ...state, amount: action.amount };
	case walletActionTypes.INVALID_AMOUNT_ERROR:
		return { ...state, amountError: action.error };
	case walletActionTypes.CHANGE_RECEIVER:
		return { ...state, receiver: action.receiver };
	case walletActionTypes.INVALID_RECEIVER_ERROR:
		return { ...state, receiverError: action.error };
	case flowActionTypes.SET_SEND_DIALOG_OPEN:
		return { ...state, transactionStatus: null };
	default:
		return state;
	}
};

export default reducer;
