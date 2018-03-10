import { combineReducers } from 'redux';
import auth from '../modules/auth/reducer';
import flow from '../modules/flow/reducer';

const rootReducer = combineReducers({ auth, flow });

export default rootReducer;
