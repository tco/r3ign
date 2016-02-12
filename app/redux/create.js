import {
    createStore as _createStore,
    applyMiddleware,
    compose
} from 'redux';

import { syncHistory }  from 'react-router-redux';
import clientMiddleware from './middleware/clientMiddleware.js';

export default function createStore(history, client, data) {
    const middleware = [clientMiddleware(client)];
    let reduxRouterMiddleware;

    if(!__TEST__) {
        reduxRouterMiddleware = syncHistory(history);
        middleware.push(reduxRouterMiddleware);
    }

    let createStoreWithMiddleware;
    if(__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        const { persistState } = require('redux-devtools');
        const DevTools = require('../containers/DevTools/DevTools.jsx');
        createStoreWithMiddleware = compose(
            applyMiddleware(...middleware),
            DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(_createStore);
    } else {
        createStoreWithMiddleware = applyMiddleware(...middleware)(_createStore);
    }

    const reducer = require('./modules/reducer.js');
    const store = createStoreWithMiddleware(reducer, data);

    if(__DEVELOPMENT__ && !__TEST__) {
        reduxRouterMiddleware.listenForReplays(store);
    }

    if(__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer.js', () => {
            store.replaceReducer(require('./modules/reducer.js'));
        });
    }

    return store;
}
