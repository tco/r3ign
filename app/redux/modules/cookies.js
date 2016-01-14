import { Cookies }                  from 'utils/index.js';
import { createReducerFromMapping } from 'redux/utils/index.js';

const ADD           = 'R3IGN/Cookies/ADD',
    ADD_SUCCESS     = 'R3IGN/Cookies/ADD_SUCCESS',
    ADD_FAIL        = 'R3IGN/Cookies/ADD_FAIL';

const initialState = { loaded: true };

export function isLoaded(globalState) {
    return globalState.cookies && globalState.cookies.loaded;
}

export function add(key, value, expires, path) {
    return {
        types: [ADD, ADD_SUCCESS, ADD_FAIL],
        promise: () => {
            let success = false;
            if (Cookies.setItem(key, value, expires, path)) {
                success = true;
            }
            return new Promise((resolve, reject) => {
                if(success) {
                    resolve(Cookies.getItem(key));
                } else {
                    reject();
                }
            });
        }
    };
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
