import React, { Component } from 'react';
import createStore          from 'redux/create.js';
import ReactTestUtils       from 'react-addons-test-utils';
import Frontpage            from './Frontpage.jsx';
import { expect }           from 'chai';

const {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
} = ReactTestUtils;

const store = createStore(null, null, {});

describe('Frontpage', () => {
    it('renders RotatingLogo', () => {
        const component = renderIntoDocument(<Frontpage store={ store } />);
        const logo = findRenderedDOMComponentWithClass(component, 'rotating-logo');
        expect(logo).not.to.equal(undefined);
    });

});
