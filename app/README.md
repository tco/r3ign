![r3ign](http://tco.github.io/r3ign/r3ign_small.png)
---

To elaborate a little on how I like to structure my application

##components
Contains all your [reusable components](https://facebook.github.io/react/docs/reusable-components.html). 
These are frequently used by your containers. No lifecycle methods here, so they can also be [stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) 

```

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

```

import React, { Component }  from 'react';
import { connect }           from 'react-redux';

// I like to use the full path in the import to the index.js to distinct it from a node module import
import { StandardPage }      from 'components/index.js';

@connect(state => ({
    routing: state.routing
}))
export default class NotFound extends Component {
    render() {
        const path = this.props.location.pathname;
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

##redux


##utils
Keep your stuff organized
