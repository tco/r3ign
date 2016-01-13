import React, { Component, PropTypes }  from 'react';

export default class Application extends Component {
    static propTypes = {
        children:   PropTypes.object.isRequired
    };

    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}
