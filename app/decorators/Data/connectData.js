import React, { Component } from 'react';
import hoistStatics         from 'hoist-non-react-statics';

/*
    When this decorator is used, it MUST be the first (outermost) decorator.
    Otherwise, we cannot find and call the fetchData methods.
*/

export default function connectData(fetchData, clientOnly = false) {

    return function wrapWithFetchData(WrappedComponent) {
        class ConnectData extends Component {
            static fetchData = fetchData;
            static fetchInClientOnly = clientOnly;

            render() {
                return <WrappedComponent { ...this.props } />;
            }
        }

        return hoistStatics(ConnectData, WrappedComponent);
    };
}
