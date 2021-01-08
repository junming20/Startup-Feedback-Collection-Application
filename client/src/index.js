import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './bootstrap.min.css'

import App from './components/App';
import reducers from './reducers';

// using axios just for testing backend route in deveploment mode
// inspect in chrome:
// const survey = { title : 'SurveyMonkey Team', subject : 'surveyMonkey testing', 'recipients': 'wang.guox@northeastern.edu', body : 'Are you planning to attend on-ground classes in Fall 2021?'}
// axios.post('/api/surveys', survey);
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment IS', process.env.NODE_ENV);
