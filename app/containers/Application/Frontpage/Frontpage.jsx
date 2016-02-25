import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import configuredRadium         from 'styles/configuredRadium.js';

import { add as addCookie }     from 'redux/modules/cookies/cookies.js';

import {
    StandardPage,
    RotatingLogo
} from 'components/index.js';

@configuredRadium
@connect(state => ({
    cookies: state.cookies
}), { addCookie })
export default class Frontpage extends Component {

    toggleRotating = (event) => {
        event.preventDefault();
        const rotateLogo = parseInt(this.props.cookies.rotateLogo, 10),
            newState = rotateLogo ? 0 : 1;

        this.props.addCookie('rotateLogo', newState, Infinity, '/');
    };

    render() {
        return (
            <StandardPage>
                <RotatingLogo rotate={ this.props.cookies.rotateLogo } toggleRotating={ this.toggleRotating } />
            </StandardPage>
        );
    }
}
