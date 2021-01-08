// a linter warning thrown in React v17 that is letting you know that
// it may be wise to use named exports, we could change state = null
// In general, warnings (especially linter warnings) can be ignored,
// errors need to be resolved.
import { FETCH_USER } from '../actions/types';
export default function(state = null, action){
  console.log(action);
  switch (action.type){
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
