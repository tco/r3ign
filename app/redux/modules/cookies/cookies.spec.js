import createStore from 'redux/create.js';

import {
    ADD,
    ADD_SUCCESS,
    add as addCookie
} from 'redux/modules/cookies/cookies.js';

describe('Cookies', () => {
    it('.add adds a cookie', (done) => {
        const store = createStore(null, null, {}),
            testKey = 'R3IGN',
            testValue = 'ROCKS!';

        store.dispatch(addCookie(testKey, testValue, Infinity, '/'));

        store.subscribe(function() {
            expect(store.getState().cookies[testKey]).to.equal(testValue);
            done();
        });

    })
});
