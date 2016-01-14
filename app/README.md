![r3ign](http://tco.github.io/r3ign/r3ign_small.png)
---

To elaborate a little on how I like to structure my application

##components
Contains all your [reusable components](https://facebook.github.io/react/docs/reusable-components.html). 
These are frequently used by your containers. No lifecycle methods here, so they can also be [stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) 

```javascript

import React            from 'react';
import configuredRadium from 'styles/configuredRadium.js';

const standardPageStyle = {
    maxWidth:   '48em',
    margin:     '0 auto',
    padding:    '2em'
};

const StandardPage = (props) => {
    return (
        <article style={ standardPageStyle }>
            { props.children }
        </article>
    );
};
export default configuredRadium(StandardPage);


```

##containers
Containers are the building blocks of your application. As a rule of thumb, a class component is mapped to a route. It 
will connect to the store and pass state as props to stateless function components. 

```javascript

import React, { Component }  from 'react';
import { connect }           from 'react-redux';

// I like to use the full path in the import to the index.js to distinct it from a node module import
import { StandardPage }      from 'components/index.js';

@connect(state => ({
    routing: state.routing
}))
export default class NotFound extends Component {
    render() {
        const path = this.props.routing.path;
        return (
            <StandardPage>
                Page not found: <strong>{ path }</strong>
            </StandardPage>
        );
    }
}

```

##decorators
Higher Order Components

```javascript

import React, { Component } from 'react';
import hoistStatics         from 'hoist-non-react-statics';

/*
    When this decorator is used, it MUST be the first (outermost) decorator.
    Otherwise, we cannot find and call the fetchData methods.
*/

export default function connectData(fetchData, clientOnly = false) {

    return function wrapWithFetchData(WrappedComponent) {
        class ConnectData extends Component {
            render() {
                return <WrappedComponent { ...this.props } />;
            }
        }

        ConnectData.fetchData = fetchData;
        ConnectData.fetchInClientOnly = clientOnly;

        return hoistStatics(ConnectData, WrappedComponent);
    };
}


```

##redux
Redux reducers live here. [epeli](https://github.com/epeli) had a good [idea](https://gist.github.com/epeli/3443e448287133ca5fb2)
to improve the action reducer pattern and got rid of the switch case in favor of a mapper function syntax. I like the
change and the current touchy feely feeling is that I will be using this pattern from now on. All I had to do was to add
the initialState to comply with redux

redux/utils/createReducerFromMapping.js
```javascript

export default (map, initialState) => {
    return (state = initialState, action) => {
        const reducer = map[action.type];
        if (typeof reducer === 'function') return reducer(state, action);
        return state;
    };
};


```

redux/modules/cookies.js
```javascript

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


```
