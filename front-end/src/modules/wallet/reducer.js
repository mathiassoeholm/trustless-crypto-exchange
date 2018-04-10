import authActionTypes from '../auth/actionTypes';

const initialState =
{
	secret: null,
};

const reducer = (state = initialState, action) =>
{
	switch (action.type)
	{
	case authActionTypes.LOG_IN:
		return { ...state, secret: action.secret };
	case authActionTypes.LOG_OUT:
		return { ...state, secret: null };
	default:
		return state;
	}
};

export default reducer;
