import React, { Component }     from 'react';
import ConfiguredRadium         from 'configuredRadium.js';

import {
    StandardPage,
    RotatingLogo
} from 'components';

@ConfiguredRadium
export default class Frontpage extends Component {
    render() {
        return (
            <StandardPage>
                <RotatingLogo />
            </StandardPage>
        );
    }
}
