import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import configuredRadium         from 'styles/configuredRadium.js';

import { add as addCookie }     from 'redux/modules/cookies.js';

import {
    StandardPage,
    RotatingLogo
} from 'components/index.js';

@configuredRadium
@connect(state => ({
    cookies: state.cookies
}), { addCookie })
export default class Frontpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotating: props.cookies.rotateLogo | 0
        };
    }

    toggleRotating() {
        const rotateLogo = this.state.rotating,
            newState = rotateLogo ? 0 : 1;

        this.props.addCookie('rotateLogo', newState, Infinity, '/').then((response) => {
            const state = response.result | 0;
            if(state === newState) {
                this.setState({
                    rotating: !!newState
                });
            }
        });

    }

    render() {
        return (
            <StandardPage>
                <RotatingLogo rotate={ this.state.rotating } toggleRotating={ this.toggleRotating.bind(this) } />
            </StandardPage>
        );
    }
}
