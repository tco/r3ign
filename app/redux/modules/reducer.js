import { combineReducers }      from 'redux';
import { routeReducer }         from 'react-router-redux';

import cookies                  from './cookies/cookies.js';

export default combineReducers({
    routing: routeReducer,
    cookies
});
