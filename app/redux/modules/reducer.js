import { combineReducers }      from 'redux';
import { routeReducer }         from 'redux-simple-router';

import cookies                  from './cookies.js';

export default combineReducers({
    routing: routeReducer,
    cookies
});
