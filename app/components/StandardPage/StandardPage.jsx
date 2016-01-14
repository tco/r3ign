import React            from 'react';
import configuredRadium from 'styles/configuredRadium.js';

const standardPageStyle = {
    maxWidth:   '48em',
    margin:     '0 auto',
    padding:    '2em'
};

const StandardPage = (props) => {
    return (
        <article style={ standardPageStyle }>
            { props.children }
        </article>
    );
};
export default configuredRadium(StandardPage);
