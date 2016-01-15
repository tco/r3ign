import { combineReducers }      from 'redux';
import { routeReducer }         from 'redux-simple-router';

import cookies                  from './cookies/cookies.js';

export default combineReducers({
    routing: routeReducer,
    cookies
});
