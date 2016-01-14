import 'babel-polyfill';
import React                    from 'react';
import ReactDOM                 from 'react-dom';
import createHistory            from 'history/lib/createBrowserHistory';
import { Provider }             from 'react-redux';
import { Router }               from 'react-router';
import { syncReduxAndRouter }   from 'redux-simple-router';

import { ApiClient }        from 'utils/index.js';
import createStore          from './redux/create.js';
import getRoutes            from './routes.js';


const client = new ApiClient();

const destination = document.getElementById('content');
const store = createStore(client, window.__data);
const history = createHistory();

syncReduxAndRouter(history, store);

function createElement(Component, props) {
    if (Component.fetchInClientOnly) {
        Component.prototype.componentDidMount = () => {
            Component.fetchData(store.getState, store.dispatch, props.location, props.params);
        };
    } else if(Component.fetchData) {
        Component.fetchData(store.getState, store.dispatch, props.location, props.params);
    }
    return React.createElement(Component, props);
}

const component = (
    <Router createElement={ createElement } history={ history }>
        { getRoutes(store) }
    </Router>
);

ReactDOM.render(
    <Provider store={ store } key="provider">
        { component }
    </Provider>,
    destination
);

if(process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if(!destination || !destination.firstChild || !destination.firstChild.attributes || !destination.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}

if (__DEVTOOLS__) {
    const DevTools = require('./containers/DevTools/DevTools');
    ReactDOM.render(
        <Provider store={ store } key="provider">
            <div>
                { component }
                <DevTools />
            </div>
        </Provider>,
        destination
    );
}
