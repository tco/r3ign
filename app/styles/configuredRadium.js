import radium from 'radium';

let _matchMedia = null;
let _userAgent = null;

function configuredRadium(component) {
    return radium({
        matchMedia: _matchMedia,
        userAgent:  _userAgent
    })(component);
}

configuredRadium.setMatchMedia = (matchMedia) => {
    _matchMedia = matchMedia;
};

configuredRadium.setUserAgent = (userAgent) => {
    _userAgent = userAgent;
};

configuredRadium.getUserAgent = () => {
    return _userAgent;
};

export default configuredRadium;
