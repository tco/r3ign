import {
    createStore as _createStore,
    applyMiddleware,
    compose
} from 'redux';

import createMiddleware from './middleware/clientMiddleware.js';

export default function createStore(client, data) {
    const middleware = [createMiddleware(client)];

    let finalCreateStore;
    if(__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        const { persistState } = require('redux-devtools');
        const DevTools = require('../containers/DevTools/DevTools.jsx');
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }

    const reducer = require('./modules/reducer.js');
    const store = finalCreateStore(reducer, data);

    if(__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer.js', () => {
            store.replaceReducer(require('./modules/reducer.js'));
        });
    }

    return store;
}
