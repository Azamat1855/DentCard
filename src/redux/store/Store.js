import { createStore } from 'redux';
import { combineReducers } from 'redux';
import medCardReducer from '../reducers/medCardReducer.jsx';

const rootReducer = combineReducers({
  medCard: medCardReducer,
});

const store = createStore(rootReducer);

export default store;
