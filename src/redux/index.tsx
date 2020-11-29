import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const makeStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default makeStore;
