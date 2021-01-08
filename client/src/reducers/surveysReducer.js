// use the boilerplate for authReducer.js
import { FETCH_SURVEYS } from '../actions/types';
// default state is an empty array
export default function(state = [], action){
  // console.log(action);
  switch (action.type){
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
