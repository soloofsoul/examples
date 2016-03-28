'use strict';

import ReactDOM = require('react-dom');

import TestComponent = require('./TestComp');

window.onload = () => {
    console.log('Typescript app is ready');
    ReactDOM.render(TestComponent({}), document.getElementById('root'));
};