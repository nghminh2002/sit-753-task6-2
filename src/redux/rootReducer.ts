import { combineReducers } from 'redux';
// slices
import authenticationReducer from './slices/authentication';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export default rootReducer;
