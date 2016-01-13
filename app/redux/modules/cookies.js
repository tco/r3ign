import {
    Cookies,
    createReducerFromMapping
} from 'tools';

const ADD_SUCCESS     = 'MUCI/Cookies/ADD_SUCCESS',
    ADD_FAIL        = 'MUCI/Cookies/ADD_FAIL';

export function isLoaded(globalState) {
    return globalState.cookies && globalState.cookies.loaded;
}

export function add(key, value, expires, path) {
    const result = {};
    let type = ADD_FAIL;
    if(Cookies.setItem(key, value, expires, path)) {
        type = ADD_SUCCESS;
        result[key] = Cookies.getItem(key);
    }
    return { type, result };
}

export default () => {
    return createReducerFromMapping({
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
    });
};
