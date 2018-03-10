import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import rootReducer from './rootReducer';

const enhancer = compose(applyMiddleware(thunk, logger));

// Connect our store to the reducer
export default createStore(rootReducer, enhancer);
