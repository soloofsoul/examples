'use strict';

import ReactDOM = require('react-dom');

import AppContainer = require('./comps/AppContainer');

window.onload = () => {
    ReactDOM.render(AppContainer({}), document.getElementById('root'));
};
