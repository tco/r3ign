import { Cookies }                  from 'utils/index.js';
import { createReducerFromMapping } from 'redux/utils/index.js';

const ADD_SUCCESS   = 'R3IGN/Cookies/ADD_SUCCESS',
    ADD_FAIL        = 'R3IGN/Cookies/ADD_FAIL';

const initialState = { loaded: true };

export function add(key, value, expires, path) {
    const result = {};
    let type = ADD_FAIL;
    if(Cookies.setItem(key, value, expires, path)) {
        type = ADD_SUCCESS;
        result[key] = Cookies.getItem(key);
    }
    return { type, result };
}

export default createReducerFromMapping({
    [ADD_SUCCESS]: (state, action) => {
        const result = action.result;
        return {
            ...state,
            added: true,
            ...result
        };
    },
    [ADD_FAIL]: (state, action) => {
        return {
            ...state,
            added: false,
            error: action.error
        };
    }
}, initialState);
