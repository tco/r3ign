import { Cookies }                  from 'utils/index.js';
import { createReducerFromMapping } from 'redux/utils/index.js';

const initialState = { loaded: true };

export function isLoaded(globalState) {
    return globalState.cookies && globalState.cookies.loaded;
}

export const ADD            = 'R3IGN/Cookies/ADD';
export const ADD_SUCCESS    = 'R3IGN/Cookies/ADD_SUCCESS';
export const ADD_FAIL       = 'R3IGN/Cookies/ADD_FAIL';
export function add(key, value, expires, path, domain, secure) {
    return {
        types: [ADD, ADD_SUCCESS, ADD_FAIL],
        promise: () => {
            let success = false;
            if (Cookies.setItem(key, value, expires, path, domain, secure)) {
                success = true;
            }
            return new Promise((resolve, reject) => {
                if(success) {
                    const result = {};
                    result[key] = Cookies.getItem(key);
                    resolve(result);
                } else {
                    reject();
                }
            });
        }
    };
}

export const REMOVE            = 'R3IGN/Cookies/REMOVE';
export const REMOVE_SUCCESS    = 'R3IGN/Cookies/REMOVE_SUCCESS';
export const REMOVE_FAIL       = 'R3IGN/Cookies/REMOVE_FAIL';
export function remove(key, path, domain) {
    return {
        types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
        promise: () => {
            let success = false;
            if (Cookies.removeItem(key, path, domain)) {
                success = true;
            }
            return new Promise((resolve, reject) => {
                if(success) {
                    resolve(key);
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
    },
    [REMOVE_SUCCESS]: (state, action) => {
        const result = action.result;
        delete state[result];
        return {
            ...state,
            removed: true
        };
    },
    [REMOVE_FAIL]: (state, action) => {
        return {
            ...state,
            removed: false,
            error: action.error
        };
    }
}, initialState);
