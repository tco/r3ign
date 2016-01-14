import React, { Component } from 'react';
import { connect }          from 'react-redux';

import { StandardPage }     from 'components/index.js';

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
