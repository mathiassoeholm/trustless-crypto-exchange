import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(applyMiddleware(sagaMiddleware, thunk, logger));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

// Connect our store to the reducer
export default store;
