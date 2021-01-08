import { combineReducers } from 'redux';
// change the default module name reducer to avoid confusion
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// including reducers for 3rd party installed
export default combineReducers({
  auth : authReducer,
  form : reduxForm,
  surveys: surveysReducer
});
