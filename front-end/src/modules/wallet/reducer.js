import authActionTypes from '../auth/actionTypes';
import walletActionTypes from './actionTypes';

const initialState =
{
	secret: null,
	balance: null,
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
	default:
		return state;
	}
};

export default reducer;
