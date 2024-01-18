import { combineReducers } from 'redux';
// slices
import authenticationReducer from './slices/authentication';
import userReducer from './slices/user';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
});

export default rootReducer;
