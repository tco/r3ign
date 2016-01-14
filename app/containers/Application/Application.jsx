import React, { Component, PropTypes }  from 'react';
import { StyleRoot }                    from 'radium';
import configuredRadium                 from 'styles/configuredRadium.js';

export default class Application extends Component {
    static propTypes = {
        children:   PropTypes.object.isRequired
    };

    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        return (
            <StyleRoot radiumConfig={{ userAgent: configuredRadium.getUserAgent() }}>
                { this.props.children }
            </StyleRoot>
        );
    }
}
