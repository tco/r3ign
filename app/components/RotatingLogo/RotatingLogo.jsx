import React                    from 'react';
import Radium, { StyleRoot }    from 'radium';
import configuredRadium         from 'styles/configuredRadium.js';

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

const getR3ignContainerStyles = (rotate) => {
    return {
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-50px',
        width: '100px',
        height: '100px',
        cursor: 'pointer',
        animation: rotate ? 'x 3s linear 0s infinite' : 'none',
        animationName: rotate ? r3ignFrames : 'none'
    };
};

const RotatingLogo = (props) => {
    return (
        <StyleRoot style={ getR3ignContainerStyles(props.rotate) } onClick={ props.toggleRotating } className="rotating-logo">
            <div style={ r3ignLogoStyles }></div>
            <div style={[r3ignLogoStyles, { transform: 'rotateY(180deg)' }]}></div>
        </StyleRoot>
    );
};

export default configuredRadium(RotatingLogo);
