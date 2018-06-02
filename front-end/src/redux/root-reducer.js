import { combineReducers } from 'redux';
import auth from '../modules/auth/reducer';
import flow from '../modules/flow/reducer';
import wallet from '../modules/wallet/reducer';

const rootReducer = combineReducers({ auth, flow, wallet });

export default rootReducer;
