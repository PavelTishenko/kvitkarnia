import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware, thunk];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);


