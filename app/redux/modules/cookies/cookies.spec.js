import createStore from 'redux/create.js';

import {
    add as addCookie,
    remove as removeCookie
} from 'redux/modules/cookies/cookies.js';

let store;

describe('Cookies', () => {
    before(function() {
        store = createStore(null, null, {});
    });

    it('.add adds a cookie', (done) => {
        const testKey = 'R3IGN',
            testValue = 'ROCKS!';

        store.dispatch(addCookie(testKey, testValue, Infinity, '/')).then(function() {
            expect(store.getState().cookies[testKey]).to.equal(testValue);
            done();
        });
    });

    it('.remove removes a cookie', (done) => {
        const testKey = 'R3IGN';

        store.dispatch(removeCookie(testKey, '/')).then(function() {
            expect(store.getState().cookies[testKey]).to.equal(undefined);
            done();
        });
    });
});
