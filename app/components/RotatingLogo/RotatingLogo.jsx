import React                    from 'react';
import Radium, { StyleRoot }    from 'radium';
import configuredRadium         from 'configuredRadium.js';

const r3ign = require('images/r3ign.png');

const r3ignLogoStyles = {
    position: 'absolute',
    width: '100px',
    height: '100px',
    backgroundImage: 'url(' + r3ign + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100px',
    backfaceVisibility: 'hidden'
};

const r3ignFrames = Radium.keyframes({
    '0%':   { transform: 'rotateY(0deg)' },
    '50%':  { transform: 'rotateY(-180deg)' }
}, 'r3ign');

const r3ignContainerStyles = {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-50px',
    width: '100px',
    height: '100px',
    animation: 'x 3s linear 0s infinite',
    animationName: r3ignFrames
};

const RotatingLogo = () => {
    return (
        <StyleRoot style={ r3ignContainerStyles }>
            <div style={ r3ignLogoStyles }></div>
            <div style={[r3ignLogoStyles, { transform: 'rotateY(180deg)' }]}></div>
        </StyleRoot>
    );
};

export default configuredRadium(RotatingLogo);
