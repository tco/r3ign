import React, { Component }     from 'react';
import configuredRadium         from 'styles/configuredRadium.js';

import {
    StandardPage,
    RotatingLogo
} from 'components/index.js';

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
