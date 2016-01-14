import React, { Component }     from 'react';
import configuredRadium         from 'styles/configuredRadium.js';

import {
    StandardPage,
    RotatingLogo
} from 'components';

@configuredRadium
export default class Frontpage extends Component {
    render() {
        return (
            <StandardPage>
                <RotatingLogo />
            </StandardPage>
        );
    }
}
